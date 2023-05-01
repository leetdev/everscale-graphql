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
    // do something with the data.data.messages array
    console.log(data.data.messages)
  } catch (error) {
    console.error(error)
  }
})()
