const ProductRouter = require('express').Router();
const productController = require('../controllers/productController');

ProductRouter.post('/', productController.add);
ProductRouter.get('/', productController.getAll);
ProductRouter.get('/:id', productController.getById);
ProductRouter.put('/', productController.update);
ProductRouter.delete('/', productController.delById);

module.exports = ProductRouter;