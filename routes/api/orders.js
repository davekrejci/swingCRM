const express = require('express');
const router = express.Router();
const Product = require('../../models').Product;
const Customer = require('../../models').Customer;
const Order = require('../../models').Order;
const OrderItem = require('../../models').OrderItem;
const lib = require('../../lib/lib');


router.get('/', async (req, res) => {
    try{
        let orders = await Order.findAll({
            include: { all:true }
        });
        res.json(orders)
    }
    catch(err){
        res.send(500);
    }
});

router.post('/', async (req, res) => {
    // Get Order data from request body
    let customerId = req.body.customerId;
    let orderitems = req.body.orderLines;

    try{
        // Check if valid customer
        let customer = await Customer.findOne({ where: { id: customerId } });
        if(!customer) return res.send(400, { message: "Customer not found" });

        // Check if valid products
        orderitems.forEach(async orderitem => {
            let product = Product.findOne( {where: { id: orderitem.product } });
            if(!product) return res.send(400, { message: "Product not found" });
        });
        
        // Create Order
        let order = await Order.create({
            customerId: customer.id
        });
        let orderTotal = 0;

        // loop through all orderitems
        await Promise.all(orderitems.map(async orderitem => {
            // find current price from product in db
            let product = await Product.findOne({ where: { id: orderitem.product } });
            // apply discount
            let price = lib.calculateDiscountPrice(product.price, customer.discount);
            // create order item
            let oi = await OrderItem.create({
                sku: product.sku,
                name: product.name,
                quantity: orderitem.quantity,
                total: (price * orderitem.quantity),
                orderId: order.id
            });
            orderTotal += oi.total;
          }));
        
        await order.update({
            total: orderTotal
        });
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    
});

router.delete('/:id', async (req, res) => {
    try{
        let order = await Order.destroy({ where: { id: req.params.id }});
        if (!order) return res.status(400).send('The order with the given ID was not found');
        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
});

module.exports = router;
