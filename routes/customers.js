const express = require('express');
const router = express.Router();
const Customer = require('../models').Customer;

router.get('/', async (req, res) => {
    let customers = await Customer.findAll();
    res.render('customers', { 
        customers: customers,
        active: { customers: true } 
     });
});

router.get('/add', (req, res) => {
    res.render('customersCreation', {
        active: { customers: true } 
    });
});

module.exports = router;