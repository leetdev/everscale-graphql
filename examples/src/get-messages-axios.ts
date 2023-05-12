import axios from 'axios'
import {BlockchainMessage} from './generated/graphql'

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
  const {data} = await axios.post('', {query})
  const messages: BlockchainMessage[] = data.data.messages
  console.log(messages)
} catch (error) {
  console.error(error)
}
