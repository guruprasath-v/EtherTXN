//import packages
const express = require('express')
const cors = require('cors'); 
const app = express();

//import files
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');
const expenseRoutes = require('./routes/expenses'); // New route
const fetchPriceWithRetry = require('./services/priceFetcher');
require('dotenv').config()

const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors()); 

// Middleware
app.use(express.json());

//price fetcher API call
fetchPriceWithRetry();

setInterval(fetchPriceWithRetry, 60000 * 10);



// Routes - API Endpoints
app.use('/api/transactions/',  transactionRoutes);
app.use('/api/total-expenses',  expenseRoutes); // Use new route

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});