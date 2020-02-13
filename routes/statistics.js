const express = require('express');
const router = express.Router();
const Customer = require('../models').Customer;

router.get('/customer', async (req, res) => {
    let customers = await Customer.findAll();
    res.render('customerStatistics', { 
        customers: customers,
        active: { customerStatistics: true } 
     });
});


router.get('/company', async (req, res) => {
    res.render('companyStatistics', { 
        active: { companyStatistics: true } 
     });
});



module.exports = router;