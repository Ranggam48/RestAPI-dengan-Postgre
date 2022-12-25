const ProductRouter = require('express').Router();
const productController = require('../controllers/productController');
const {authentication, authorization} = require('../middleware/auth');

ProductRouter.use(authentication);

ProductRouter.post('/', authorization.admin, productController.add);
ProductRouter.get('/', productController.getAll);
ProductRouter.get('/:id', productController.getById);
ProductRouter.put('/:id', authorization.admin, productController.update);
ProductRouter.delete('/:id', authorization.admin, productController.delById);

module.exports = ProductRouter;