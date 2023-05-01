import axios from 'axios'

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

(async () => {
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
    console.log(`The account balance is ${data.data.blockchain.account.info.balance / 10 ** 9}`)
  } catch (error) {
    console.error(error)
  }
})()
