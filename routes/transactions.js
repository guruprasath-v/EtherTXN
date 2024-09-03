const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');

const router = express.Router();

//pagination helper function
function transactionList(pageWant, totalLength, address, transactions) {
    const transactionDatas = [];
    const maxPage = Math.ceil(totalLength / 10);

    if (pageWant > maxPage) {
        throw new Error(`Page limit exceeded for this address: ${address}. Try to limit the page within ${maxPage}`);
    }

    let startIndex = (pageWant - 1) * 10;
    
    // Ensure we do not go beyond the transaction array length
    for (let index = startIndex; index < startIndex + 10 && index < transactions.length; index++) {
        transactionDatas.push(transactions[index]);
    }

    return transactionDatas;
}

// Route to fetch and store transactions
router.get('/:address', async (req, res) => {
    const address = req.params.address;
    const pageNo = parseInt(req.query.page) || 1;
    
    try {
        const transactionResponse = await Transaction.findOne({ address });

        if (transactionResponse) {
            try {
                const totalLength = transactionResponse.transactions.length;
                const response = transactionList(pageNo, totalLength, address, transactionResponse.transactions); // Fixed passing the array
                res.status(200).json(response);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        } else {
            const transactions = [];
            let hasMore = true;
            let totalLength = 0;
            let pageToGet = 1; 

            while (hasMore) {
                const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${pageToGet}&offset=20&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`);

                // Check for Etherscan API errors
                if (response.data.status === "0" && response.data.message === "NOTOK") {
                    return res.status(400).json({ error: "Invalid Ethereum address or API error." });
                }

                const newTransactions = response.data.result;

                if (newTransactions.length > 0) {
                    totalLength += newTransactions.length;
                    transactions.push(...newTransactions); // Correct way to add new transactions
                    pageToGet++;
                } else {
                    hasMore = false;
                }
            }

            if (transactions.length === 0) {
                return res.status(404).json({ error: "No transactions found" });
            }

            const newTransaction = new Transaction({ address, transactions });
            await newTransaction.save();
            const toDisplay = transactionList(1, totalLength, address, transactions);
            res.status(200).json(toDisplay);

        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
