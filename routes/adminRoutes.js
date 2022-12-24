const adminRouter = require('express').Router();
const adminController = require('../controllers/adminController');

adminRouter.post('/register', adminController.register);
adminRouter.post('/login', adminController.login);

module.exports = adminRouter;