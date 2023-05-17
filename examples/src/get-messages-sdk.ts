import {TonClient} from '@eversdk/core'
import {libNode} from '@eversdk/lib-node'
import {BlockchainQuery} from './generated/graphql'

// configure your credentials here
const PROJECT_ID = ''
const PROJECT_SECRET = ''
const ACCOUNT_ADDRESS = ''

TonClient.useBinaryLibrary(libNode)

const client = new TonClient({
    network: {
      endpoints: [`https://mainnet.evercloud.dev/${PROJECT_ID}/graphql`],
      access_key: PROJECT_SECRET,
    },
  })

interface MyQuery {
  address: string
  cursor: string | null
  count: number
  seq_no: number
}

try {
  const query = `
    query MyQuery($address: String!, $cursor: String, $count: Int, $seq_no: Int){
      blockchain {
        account(address: $address){
          messages(
            msg_type: ExtIn
            master_seq_no_range: {
              start: $seq_no
            }
            first: $count
            after: $cursor
          ){
            edges{
              node{
                hash
                msg_type
                value(format: DEC)
                src
              }
            }
          }
        }
      }
    }`
  const variables: MyQuery = {
    address: ACCOUNT_ADDRESS,
    cursor: null,
    count: 10, // number per page, max: 50
    seq_no: 1, // set to the initial block sequence number
  }
  while (true) { // infinity loop, implement exit condition here
    const {result} = await client.net.query({query, variables})
    const data: BlockchainQuery = result.data
    const messages = data.account.messages
    variables.cursor = messages.pageInfo.endCursor || variables.cursor
    messages.edges.forEach(edge => {
      const message = edge.node
      // do something with message
      console.log(message)
    })
    // implement a delay here so as not to spam the API
  }

  client.close()
} catch (error) {
  console.error(error)
}
