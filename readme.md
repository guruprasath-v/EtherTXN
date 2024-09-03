
# Etherium Transactions
This repo provides API's for getting your Etherium Transactions and total expenses of your transactions.




## Test
If you want to try it I've deployed my backend in [render.com](https://render.com/). 

And here's the Base URL: https://ethertxn.onrender.com/ - copy this and try it in `postman` and use API endpoints mentioned in  **API enpoints section**

# Otherwise contribute or get Locally 


## Installation

If you want to contribute or get to work with follow the steps:

```bash
  git clone 
  cd
```

After get into directory, 
```bash
npm install
```

After that you get your node_modules

Now you need to provide .env file

1.) Create a `.env` file in the root directory.

2.) Go to [Etherscan API](https://docs.etherscan.io/) and create your own account to generate an API key.

3.) Go to [Mongo Atlas](https://cloud.mongodb.com/v2/65f66512ce22070bf8f213fb#/overview) and create new db and add proper uri password.

4.) Now add variables in .env 
```js
ETHERSCAN_API_KEY=your_api_key
MONGO_URI=mongo_uri
PORT=8080
```

After this, start the server:
```bash
npm start
```


### [API Endpoints Details](#api-endpoints-details)

- **GET /api/transactions/{address}?page=1**
  - Description: Retrieves the List of paginated transactions for a given Ethereum address.
  - Example URL: `https://ethertxn.onrender.com/api/transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d`
  - Method: GET
  - Parameters:
    - `address`: Ethereum address (required)
  - query parameters:
    - `page`: 1 to MaxPage (optional default to 1)
  - Example response

    ```[
    {
      "blockNumber": "14609155",
      "timeStamp": "1650284543",
      "hash": "0x25f745fc71d9ddd0db561d06a023e6c654089861dc4625cdc81743afd3228982",
      "nonce": "112207",
      "blockHash": "0xa48498a87afc3714f3e6edce2fd3344ddbdb85e77eaf85bed3afa60f879616e1",
      "transactionIndex": "220",
      "from": "0xf598b81ef8c7b52a7f2a89253436e72ec6dc871f",
      "to": "0xce94e5621a5f7068253c42558c147480f38b5e0d",
      "value": "10003420000000000",
      "gas": "105000",
      "gasPrice": 29489937413,
      "isError": "0",
      "txreceipt_status": "1",
      "input": "0x",
      "contractAddress": "",
      "cumulativeGasUsed": "14067378",
      "gasUsed": 21000,
      "confirmations": "6061431",
      "_id": "66d71a325573c7fa35df5b1d"
    },
    {
      "blockNumber": "14636492",
      "timeStamp": "1650654993",
      "hash": "0x5bb7936a0a9381f62c2c6c761818a937c89eeeae340658f505138c9174279cb0",
      "nonce": "150308",
      "blockHash": "0x8b56db4a4dacbe520d6dfa89971e7f209c00b484072e9dc4083ff6fb46bed29a",
      "transactionIndex": "35",
      "from": "0xb04c0eb29c72cebc467b9d4944d29116fa02c44a",
      "to": "0xce94e5621a5f7068253c42558c147480f38b5e0d",
      "value": "10002160000000000",
      "gas": "105000",
      "gasPrice": 57338292678,
      "isError": "0",
      "txreceipt_status": "1",
      "input": "0x",
      "contractAddress": "",
      "cumulativeGasUsed": "2128721",
      "gasUsed": 21000,
      "confirmations": "6034094",
      "_id": "66d71a325573c7fa35df5b1e"
    }]```


- **GET /api/total-expenses/{address}**:
  - Description: Retrieves the total expenses and the current Etherium price for a given Ethereum address.
  - Example URL: `https://ethertxn.onrender.com/api/total-expenses/0xce94e5621a5f7068253c42558c147480f38b5e0d`
  - Method: GET
  - Parameters:
    - `address`: Ethereum address (required)
  - Example response:
  ```
  {
  "address": "0xce94e5621a5f7068253c42558c147480f38b5e0d",
  "totalExpenses": 0.06374308513796999,
  "currentPrice": 205471
  }
  ```
