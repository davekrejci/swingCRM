// Add modules
const express = require('express');
const app = express();
const path = require('path');
const {sequelize} = require('./models');
const Product = require('./models').Product;
const Customer = require('./models').Customer;

const config = require('./config/config');
const exphbs = require('express-handlebars');

// Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Define routes
app.use('/', require('./routes/home'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/statistics', require('./routes/api/statistics'));
app.use('/customers', require('./routes/customers'));
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/statistics', require('./routes/statistics'));

// Sync models to database
sequelize.sync(
    // {force: true}
    )
    .then(() => { 
        console.log('Connection to database has been established successfully.');

        // Customer.bulkCreate([
        //     { name: "Coca-Cola", address: "123 Main Street, California 90001", email: "sales@mail.com", phone: "+1-00-231-1231-412", discount: 15},
        //     { name: "Boeing", address: "123 Main Street, California 90001", email: "sales@mail.com", phone: "+1-00-231-1231-412", discount: 15},
        //     { name: "NASA", address: "123 Main Street, California 90001", email: "sales@mail.com", phone: "+1-00-231-1231-412", discount: 15},
        //     { name: "IBM", address: "123 Main Street, California 90001", email: "sales@mail.com", phone: "+1-00-231-1231-412", discount: 15},
        //     { name: "Google", address: "123 Main Street, California 90001", email: "sales@mail.com", phone: "+1-00-231-1231-412", discount: 15}
        // ]);

        // Product.bulkCreate([
        //     { sku: "E6-12363", name: "Banana", price: 13},
        //     { sku: "E6-14592", name: "Apple", price: 10},
        //     { sku: "E6-14812", name: "Orange", price: 15}
        // ]);

        // Set port and listen for incoming requests
        app.listen(config.port, () => console.log(`Listening on port ${config.port}`));

    })
    .catch(err => { console.log('Unable to connect to the database:', err.message)});

