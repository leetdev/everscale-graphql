import {TonClient} from '@eversdk/core'
import {libNode} from '@eversdk/lib-node'
import {BlockchainMessage} from './generated/graphql'

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

try {
  const query = `
    query {
      messages(
        filter: {
          dst: {
            eq: "${ACCOUNT_ADDRESS}"
          }
        }
      ) {
        id
        src
        value(format: DEC)
      }
    }`
  const {result} = await client.net.query({query})
  const messages: BlockchainMessage[] = result.data.messages
  console.log(messages)
  client.close()
} catch (error) {
  console.error(error)
}
