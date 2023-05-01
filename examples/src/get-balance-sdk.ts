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
        blockchain {
          account(
            address: "${ACCOUNT_ADDRESS}"
          ) {
            info {
              balance(format: DEC)
            }
          }
        }
      }`
    const {result} = await client.net.query({query})
    console.log(`The account balance is ${result.data.blockchain.account.info.balance / 10**9}`)
    client.close()
  } catch (error) {
    console.error(error)
  }
})()
