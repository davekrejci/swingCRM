const express = require('express');
const router = express.Router();
const Product = require('../models').Product;
const Customer = require('../models').Customer;
const Order = require('../models').Order;
const OrderItem = require('../models').OrderItem;

// www.swingcrm.com/orders
router.get('/', async (req, res) => {
    try{
        // Get all orders
        let orders = await Order.findAll({
            include: [{ all:true }],
        })
        res.render('orders', { 
            orders: orders,
            active: { orders: true } 
         });
    }
    catch(err){
        console.log(err);
        res.send(500);
    }
});

// www.swingcrm.com/orders/add
router.get('/add', async (req, res) => {
    let products = await Product.findAll();
    let customers = await Customer.findAll();
    res.render('ordersCreation', {
        products: products,
        customers: customers,
        active: { 
            ordersCreation: true 
        }
    });
});

// www.swingcrm.com/orders/details/14
router.get('/details/:id', async (req, res) => {
    // Get all orders
    let order = await Order.findOne({
        where: { id: req.params.id },
        include: [{ all:true }]
    })
    console.log(order);
    res.render('orderDetail', { 
        order: order,
        active: { orderDetail: true } 
     });
});



module.exports = router;