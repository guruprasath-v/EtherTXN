const axios = require('axios');
const Price = require('../models/Price');

// Function to fetch current price of Ether
async function fetchPrice() {
    try {
        // Fetch the current price of Ethereum in INR
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const etheriumPriceInINR = +response.data.ethereum.inr;

        if (!etheriumPriceInINR) {
            console.error('Invalid Ethereum price received.');
            return "Failed";
        }

        // Use findOneAndUpdate to either update an existing document or create a new one
        const updatedEtheriumPrice = await Price.findOneAndUpdate(
            {},  // Search condition: an empty object means we're not applying any specific filter, effectively fetching the first document
            { price_in_inr: etheriumPriceInINR }, // Update the price field
            { new: true, upsert: true } // Options: 'new' returns the updated document; 'upsert' creates a new document if no match is found
        );

        console.log('Price fetched and updated/created successfully:');
        return updatedEtheriumPrice
    } catch (err) {
        console.error('Failed to fetch the price:', err.message);
        return "Failed";
    }
}

// Function to repeatedly fetch price
async function fetchPriceWithRetry() {
    try {
        const result = await fetchPrice();
        if (result === "Failed") {
            console.error("Failed to fetch price. Retrying in the next interval...");
        }
    } catch (error) {
        console.error("Error occurred while fetching price:", error);
    }
}


// Export the fetchPrice function if needed in other modules
module.exports = fetchPriceWithRetry;
