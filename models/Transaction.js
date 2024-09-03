const mongoose = require('mongoose');

// Define the schema for transactions
const TransactionSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true, // Ensures that the address is provided
        unique: true, // Ensures that each address is unique in the collection
        index: true // Adds an index to the address field for faster querying
    },
    transactions: [
        {
            blockNumber: String,  // Block number of the transaction
            timeStamp: String,  // Timestamp of the transaction
            hash: String,  // Transaction hash
            nonce: String,  // Transaction nonce
            blockHash: String,  // Block hash
            transactionIndex: String,  // Transaction index within the block
            from: String,  // Sender address
            to: String,  // Recipient address
            value: String,  // Amount transferred
            gas: String,  // Gas provided
            gasPrice: Number,  // Gas price in wei
            isError: String,  // '0' for success, '1' for error
            txreceipt_status: String,  // Receipt status, '1' for success, '0' for fail
            input: String,  // Input data
            contractAddress: String,  // Contract address if this is a contract creation transaction
            cumulativeGasUsed: String,  // Cumulative gas used
            gasUsed: Number,  // Gas used by this specific transaction
            confirmations: String  // Number of confirmations
        }
    ]
});

module.exports = mongoose.model('Transaction', TransactionSchema);
