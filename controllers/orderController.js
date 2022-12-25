const {Order, Product} = require('../models');
const { decode } = require('../helpers/jwt');

const productController = require('../controllers/productController');

const create = async (req, res) => {

    try {
        req.user = decode(req.headers.authorization);
        const cust_Id = req.user.id;

        console.log(req.user);
    
        
        const product = await Product.findByPk(req.body.productId);

        console.log(product);
    
        const order = {
            custId: cust_Id,
            productId: product.id,
            qty: req.body.qty,
            status: req.body.status
        }

        await Order.create(order);

        console.log('<<<<<');

        const newStock = {
            stock : product.stock - req.body.qty
        }

        await product.update(newStock);  
    
        return res.status(201).json({
            message: 'Berhasil membuat Order'
          })
    } catch (error) {
        return res
        .status(error.status ||  500)
        .json({ message: error.message || 'Internal server error' })
    }
};

module.exports = {
    create
}