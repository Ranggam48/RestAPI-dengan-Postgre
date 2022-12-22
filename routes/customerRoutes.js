const costumerRouter = require('express').Router();
const costumerController = require('../controllers/customerController');


costumerRouter.post('/register', costumerController.register);
costumerRouter.post('/login', costumerController.login);


module.exports = costumerRouter;
