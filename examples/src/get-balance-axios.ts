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

async function main() {
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
    const {data} = await axios.post('', {query})
    const blockchain: BlockchainQuery = data.data.blockchain
    console.log(`The account balance is ${parseInt(blockchain.account?.info?.balance || '0', 10) / 10**9}`)
  } catch (error) {
    console.error(error)
  }
}

main()
