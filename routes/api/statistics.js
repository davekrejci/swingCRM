const express = require('express');
const router = express.Router();
const sequelize = require('../../models').sequelize;
const OrderItem = require('../../models').OrderItem;
const Order = require('../../models').Order;


router.get('/', async (req, res) => {
    try{
        let statistics = {};
        // Product totals
        statistics.productQuantities = await OrderItem.findAll({
            attributes: [
                'sku',
                'name',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'quantity']],
            group: ['sku','name'],
            raw: true
        });
        // Year totals
        statistics.yearTotals = await OrderItem.findAll({
            attributes: [
                [sequelize.fn('to_char', sequelize.col('createdAt'), 'YYYY'), 'year'],
                [sequelize.fn('SUM', sequelize.col('total')), 'total']
            ],
            group: [ [sequelize.fn('date_part', 'year', sequelize.col('createdAt'))], 'year'],
            order: [ [sequelize.fn('date_part', 'year', sequelize.col('createdAt'))] ],
            raw: true
        });
        // Month totals
        statistics.monthTotals = await OrderItem.findAll({
            attributes: [
                [sequelize.fn('to_char', sequelize.col('createdAt'), 'MON YYYY'), 'month'],
                [sequelize.fn('SUM', sequelize.col('total')), 'total']
            ],
            group: [[sequelize.fn('date_part', 'year', sequelize.col('createdAt'))], [sequelize.fn('date_part', 'month', sequelize.col('createdAt'))], 'month'],
            order: [
                [ [sequelize.fn('date_part', 'year', sequelize.col('createdAt')), 'ASC'] ],
                [ [sequelize.fn('date_part', 'month', sequelize.col('createdAt')), 'ASC'] ]
            ],
            raw: true
        });
        
       res.json(statistics);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});


router.get('/:id', async (req, res) => {
    let customerId = req.params.id;
    try{
        let statistics = {};
        let customerOrderIds = await Order.findAll({ 
            where: { customerId: customerId }, 
            attributes: ['id']
        }).map(el => el.get('id'));

        
        statistics.productList = await OrderItem.findAll({
            where: { orderId: customerOrderIds },
            attributes: [
                'sku',
                'name',
            ],
            group: ['sku', 'name'],
            raw: true
        });

        statistics.productQuantities = await OrderItem.findAll({
            where: { orderId: customerOrderIds },
            attributes: [
                'sku',
                'name',
                [sequelize.fn('to_char', sequelize.col('createdAt'), 'MON YYYY'), 'month'],
                [sequelize.fn('SUM', sequelize.col('quantity')), 'quantity']
            ],
            group: ['sku', 'name', [sequelize.fn('date_part', 'year', sequelize.col('createdAt'))], [sequelize.fn('date_part', 'month', sequelize.col('createdAt'))], 'month'],
            order: [
                [ [sequelize.fn('date_part', 'year', sequelize.col('createdAt')), 'ASC'] ],
                [ [sequelize.fn('date_part', 'month', sequelize.col('createdAt')), 'ASC'] ]
            ],
            raw: true
        });
        // Month averages
        statistics.monthAverages = await OrderItem.findAll({
            where: { orderId: customerOrderIds },
            attributes: [
                [sequelize.fn('to_char', sequelize.col('createdAt'), 'Month'), 'month'],                
                [sequelize.fn('AVG', sequelize.col('total')), 'average'],
            ],
            group: [[sequelize.fn('date_part', 'month', sequelize.col('createdAt'))], 'month'],
            raw: true
        });
        
       res.json(statistics);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/:customerId/:sku', async (req, res) => {
    try{
        let statistics = {};
        let customerOrderIds = await Order.findAll({ 
            where: { customerId: req.params.customerId }, 
            attributes: ['id']
        }).map(el => el.get('id'));
        // Product totals
        statistics.quantitiesByMonth = await OrderItem.findAll({
            where: { 
                orderId: customerOrderIds,
                sku: req.params.sku
            },
            attributes: [
                'sku',
                'name',
                [sequelize.fn('to_char', sequelize.col('createdAt'), 'Month'), 'month'],                
                [sequelize.fn('SUM', sequelize.col('quantity')), 'quantity'],
            ],
            group: ['sku', 'name',[sequelize.fn('date_part', 'month', sequelize.col('createdAt'))], 'month'],
            raw: true
        });
        
        
       res.json(statistics);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;
