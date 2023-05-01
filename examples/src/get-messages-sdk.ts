import {TonClient} from '@eversdk/core'
import {libNode} from '@eversdk/lib-node'

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

;(async () => {
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
    // do something with result.data.messages array
    console.log(result.data.messages)
    client.close()
  } catch (error) {
    console.error(error)
  }
})()
