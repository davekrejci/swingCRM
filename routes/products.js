const express = require('express');
const router = express.Router();
const Product = require('../models').Product;

router.get('/', async (req, res) => {
    let products = await Product.findAll();
    res.render('products', { 
        products: products,
        active: { products: true } 
     });
});


router.get('/add', (req, res) => {
    res.render('productsCreation', {
        active: { products: true } 
    });
});


router.post('/add', async (req, res) => {
    let { sku, name, price } = req.body;
    // check if product in db already
    let product = await Product.findOne({
        where: { sku: sku }
    });
    if(product === null) {
        // add to database
        try{
            await Product.create({
                 sku: sku,
                 name: name,
                 price: price,
            });
            res.redirect('/products');
        }
        catch(err){
            res.render('productsCreation', {
                active: { products: true },
                error: `Error creating product. Please try again.`
            });
        }
    }
    else{
        res.render('productsCreation', {
            active: { products: true },
            error: `Product with sku ${sku} is already registered.`
        });
    }
});


module.exports = router;