const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Price = require('../models/Price');
const fetchPriceWithRetry = require('../services/priceFetcher');
const { calculateTotalExpenses } = require('../utils/calculateExpenses');

// GET endpoint to get total expenses and current price of Ether
router.get('/:address', async (req, res) => {
    const  address  = req.params.address;
    console.log(address)
    try {
        // Fetch transactions from MongoDB
        const transactions = await Transaction.findOne({ address });
        // Calculate total expenses
        const totalExpenses = calculateTotalExpenses(transactions.transactions);

        // Fetch current price of Ether
        const {price_in_inr} = await Price.findOne({});
        const etherPrice = price_in_inr

        // Send the response
        res.json({
            address: address,
            totalExpenses: totalExpenses,
            currentPrice: etherPrice
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;