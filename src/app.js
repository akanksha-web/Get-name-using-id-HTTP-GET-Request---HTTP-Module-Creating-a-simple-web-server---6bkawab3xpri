const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`, 'utf-8')
);

// Middleware
app.use(express.json());

// GET endpoint for sending the products to client by id
// Endpoint - /api/v1/names/:id
app.get('/api/v1/names/:id', (req, res) => {
    const { id } = req.params;
    const product = productNames.find(product => product.id === parseInt(id));

    if (product) {
        res.status(200).json({
            status: 'success',
            message: 'Product name fetched successfully',
            data: {
                name: product
            }
        });
    } else {
        res.status(404).json({
            status: 'failed',
            message: 'Not found!'
        });
    }
});

module.exports = app;
