# Everscale GraphQL

Everscale offers a powerful and flexible [GraphQL](https://graphql.org/) API for interacting with its blockchain. This API provides a comprehensive set of queries and mutations, allowing developers to seamlessly integrate Everscale into their application backends, making it easier to access data and perform actions on the Everscale blockchain.

GraphQL is a query language for APIs and a runtime for executing those queries by using a type system that you define for your data. It enables you to request only the data you need, making it an efficient and flexible solution for working with APIs. This makes Everscale's GraphQL API a perfect choice for developers looking to build scalable and high-performance applications.

## Getting started

To begin, you will need a GraphQL endpoint to connect to. In the examples provided below, we'll use [Evercloud](https://www.evercloud.dev/), a managed GraphQL service for the Everscale network. Evercloud makes it easy to set up and manage a GraphQL endpoint for your application, providing you with secure access to the Everscale blockchain.

Follow [this guide](https://docs.evercloud.dev/products/evercloud/get-started) to set up a project on Evercloud. Make sure to note down the project ID in the security tab, as well as the project secret, as you will need to configure these in the code.

Once you have the necessary credentials, you're ready to start making GraphQL queries to the Everscale network in your JavaScript/TypeScript project. To cater to various development preferences, we'll provide two versions for each example: one using the Everscale SDK (follow [this guide](https://docs.everos.dev/ever-sdk/guides/installation/add_sdk_to_your_app) for setup instructions) and another using [Axios](https://axios-http.com/), a popular HTTP client for JavaScript.

## Code examples

### Get account balance

This example demonstrates how to query the balance of a specified account using both the Everscale SDK and Axios. Understanding the balance of an account is crucial for various use cases, such as validating transactions or displaying account information to users.

**Everscale SDK**:

```typescript
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
```

**Axios**:
```typescript
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
```

### Get incoming messages

This example shows how to query incoming messages for a specified destination account using both the Everscale SDK and Axios. This can be particularly useful for processing incoming token transfers or other transaction-related information.

Keep in mind that you will need to implement your own pagination to retrieve all messages, as the maximum limit of messages returned per query is 50. Consult [this document](https://docs.evercloud.dev/reference/graphql-api/query_language#sorting-and-limiting) for more information on how to achieve this.

**Everscale SDK**:

```typescript
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
```

**Axios**:
```typescript
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
```

### Comprehensive example

For a more in-depth, real-world example of how to use the Everscale SDK to process transactions related to a wallet, as well as other common backend functionalities that an application implementing Everscale might require, please visit [this repository](https://github.com/tonlabs/sdk-samples/tree/master/demo/exchange). This comprehensive example demonstrates best practices and provides a solid foundation for building scalable and efficient applications on the Everscale network.
