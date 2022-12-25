const OrderRouter = require('express').Router();
const orderController = require('../controllers/orderController');
const {authentication, authorization} = require('../middleware/auth');


OrderRouter.use(authentication);

OrderRouter.post('/', authorization.customer, orderController.create);

module.exports =  OrderRouter
