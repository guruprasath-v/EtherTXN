
# Etherium Transactions
This repo provides API's for getting your Etherium Transactions and total expenses of your transactions.




## Installation

If you want to contribute or get to work with follow the steps:

```bash
  git clone https://github.com/guruprasath-v/EtherTXN.git
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

## Try these API's 
Try these API's in postman or Thunderclient

This is for get all transactions: (http://localhost:8080/api/transactions/${address}?page=1)

This is for getting your total expenses; (http://localhost:8080/api/total-expenses/${address})
