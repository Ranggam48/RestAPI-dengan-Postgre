require('dotenv').config();
const express = require('express');
const app = express();


// init routes

const productRoutes = require('./routes/productRoutes');
const costumerRoutes = require('./routes/customerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));


app.get('/', (req, res) => res.send('Server Running'));


// init end point

app.use('/product', productRoutes);
app.use('/customer', costumerRoutes)
app.use('/admin', adminRoutes);
app.use('/order', orderRoutes);


app.listen(process.env.PORT,() => {
    console.log('<<<< SERVER RUNNING ON PORT', process.env.PORT);
});

