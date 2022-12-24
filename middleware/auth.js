const { decode } = require('../helpers/jwt');


const authentication = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({
            message: `Unauthenticated`
        });
    }

    try {
        req.user = decode(req.headers.authorization);
        console.log(req.user);
        
    } catch (error) {
        return res
        .status(error.status||500)
        .json({message: error.message || 'internal server error'});
    }
    return next();
};

const authorization = {
    admin : (req, res, next) =>{
        if(req.user.isAdmin === true) return next();

        return res.status(401).json({
            message: 'Unauthorized'
        });
    },

    customer : (req, res, next) =>{
        if(req.user.isAdmin === false) return next();

        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}

module.exports = {
    authentication,
    authorization
}