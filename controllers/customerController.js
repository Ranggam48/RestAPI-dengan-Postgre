const { User } = require('../models');
const { validateText } = require('../helpers/bcrypt');
const { encode } = require("../helpers/jwt");

const register = async(req, res) => {
    console.log(req.body);
    try {
        const customer = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
            noPhone: req.body.noPhone
        }

        await User.create(customer);

        return res.status(200).json({
            message:`Berhasil melakukan register dengan Username: ${req.body.username}.`
        })
    } catch (error) {
        return res
        .status(error.status||500)
        .json({message: error.message || 'internal server error'});
    }
};

const login = async(req, res) => {
    console.log(req.body);
    try {
        const customer = await User.findOne({
            attributs: ['id', 'name', 'email'],
            where: {
                email: req.body.email
            }
        });

        if(!customer){
            return res.status(401).json({
                message: `eamil atau password salah.`
            })
        };

        const checkPass = validateText(req.body.password, customer.password);

        if(!checkPass){
            return res.status(401).json({
                message: `email atau password salah.`
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'Berhasil login',
            token: encode({
              id: customer.id,
              name: customer.name,
              email: customer.email,
              isAdmin: customer.isAdmin
            })
          });
    } catch (error) {
        return res
        .status(error.status||500)
        .json({message: error.message || 'internal server error'});
    }
}

module.exports = {
    register,
    login
}