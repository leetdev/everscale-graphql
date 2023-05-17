import axios from 'axios'
import {BlockchainQuery} from './generated/graphql'

// configure your credentials here
const PROJECT_ID = ''
const PROJECT_SECRET = ''
const ACCOUNT_ADDRESS = ''

axios.defaults.baseURL = `https://mainnet.evercloud.dev/${PROJECT_ID}/graphql`
axios.defaults.headers.post['Content-Type'] = 'application/json'
if (PROJECT_SECRET) {
  axios.defaults.auth = {
    username: '',
    password: PROJECT_SECRET,
  }
}

interface MyQuery {
  address: string
  cursor: string | null
  count: number
  seq_no: number
}

async function main() {
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
      const {data} = await axios.post('', {query, variables})
      const result: BlockchainQuery = data.data
      const messages = result.account?.messages
      const edges = messages?.edges || []
      variables.cursor = messages?.pageInfo.endCursor || variables.cursor
      edges.forEach(edge => {
        const message = edge.node
        // do something with message
        console.log(message)
      })
      // implement a delay here so as not to spam the API
    }
  } catch (error) {
    console.error(error)
  }
}

main()
