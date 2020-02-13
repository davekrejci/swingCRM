const express = require('express');
const router = express.Router();
const Customer = require('../../models').Customer;

router.post('/add', async (req, res) => {
    // check if customer in db already
    let customers = await Customer.findAll({
        where: { name: req.body.name }
    });
    if (customers === undefined || customers.length === 0) {
        // add to database
        try{
            let customer = await Customer.create({
                 name: req.body.name,
                 address: req.body.address,
                 email: req.body.email,
                 phone: req.body.phone,
                 discount: req.body.discount
            });
            res.redirect('/customers');
        }
        catch(err){
            res.sendStatus(500);
        }
    }
    else{
        res.render('customersCreation', {
            active: { customers: true },
            error: 'Customer is already registered.'
        });
    }

});
router.put('/:id', async (req, res) => {
    try{
        let customer = await Customer.update({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            discount: req.body.discount
        },
        { where: { id: req.params.id }});
        if (!customer) return res.status(400).send('The customer with the given ID was not found');
        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
});
router.delete('/:id', async (req, res) => {
    try{
        let customer = await Customer.destroy({ where: { id: req.params.id }});
        if (!customer) return res.status(400).send('The customer with the given ID was not found');
        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
});

module.exports = router;
