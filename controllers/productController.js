const  { Product } = require('../models');


const add = async(req, res) => {
    try {
        if(!req.body.name){
            return res.json({
                message: "Parameter nama tidak boleh kosong"
            });
        }

        if (!req.body.prize){
            return res.json({
                message: "Parameter prize tidak boleh kosong"
            });
        }
        if (!req.body.stock){
            return res.json({
                message: "Parameter stock tidak boleh kosong"
            });
        }
        console.log(req.body);

        const newItem = {
            name: req.body.name,
            prize: req.body.prize,
            stock: req.body.stock
        }

        await Product.create(newItem);

        return res.json({
            message: `Berhasil menambahkan item dengan nama ${newItem.name}`
        });
    } catch (error) {
        return res
        .status(error.status||500)
        .json({message: error.message || 'internal server error'});
    }
};

const getAll= async(req, res) => {

    try {
        const product = await Product.findAll();
        return res.status(200).json({
        message: "Berhasil mendapatkan semua item",
        data: [
            product
        ]
    });        
    } catch (error) {
        return res
        .status(error.status||500)
        .json({message: error.message || 'internal server error'});
    }    
};

const getById = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            },
        });

        if(!product){
            return res.status(400).json({message:"Product tidak ditemukan"});
        }

        return res.status(200).json({
            message: `Berhasil mendapatkan Product dengan ID: ${req.params.id}.`,
            data: product
        })
    } catch (error) {
        return res
        .status(error.status||500)
        .json({message: error.message || 'internal server error'});
    }
}

const update = async(req, res) => {
    try {

        const id = req.params.id
        let product = await  Product.findByPk(id);

        if(!product){
            return res.status(400).json({message:"Product tidak ditemukan"});
        }
        const newProduct = {
            name: req.body.name,
            prize: req.body.prize,
            stock: req.body.stock
        }

        product = await product.update(newProduct)

        return res.status(200).json({
            message: `Berhasil merubah Product dengan ID : ${req.params.id}`,
            data: [
                product
            ]
        })

    } catch (error) {
        return res
        .status(error.status||500)
        .json({message: error.message || 'internal server error'});
    }
};

const delById = async(req, res) => {
    try {

        const id = req.params.id;

        const product = await Product.findByPk(id);

        if(!product){
            return res.status(400).json({message:"Product tidak ditemukan"});
        }

        await product.destroy();

        return res.status(200).json({
            message: `Berhasil menghapus Product dengan ID: ${id}.`
        })
    } catch (error) {
        return res
        .status(error.status||500)
        .json({message: error.message || 'internal server error'});
    }
}

module.exports = {
    add,
    getAll,
    getById,
    update,
    delById
}