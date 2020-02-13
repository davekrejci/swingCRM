const express = require('express');
const router = express.Router();
const Product = require('../../models').Product;


router.get('/', async (req, res) => {
    try{
        let products = await Product.findAll({
            include: {all:true}
        });
        res.json(products) 
    }
    catch(err){
        console.log(err);
        res.send(500);
    }
});


router.get('/:id', async (req, res) => {
    try{
        let product = await Product.findOne( {where : { id: req.params.id }});
        res.json(product) 
    }
    catch(err){
        console.log(err);
        res.send(500);
    }
});

router.put('/:id', async (req, res) => {
    let { id, name, price } = req.body;
    try{
        let product = await Product.update({
            name: name,
            price: price
        },
        { where: { id: id }});
        if (!product) return res.status(400).send('The customer with the given ID was not found');
        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
});
router.delete('/:id', async (req, res) => {
    try{
        let product = await Product.destroy({ where: { id: req.params.id }});
        if (!product) return res.status(400).send('The product with the given ID was not found');
        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
});

module.exports = router;
