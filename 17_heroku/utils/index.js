let util = require('util');
const {loggerWarn, loggerErr, loggerInfo} = require('../utils/logger');

function validateSecurity(req, res, next) {
    if (req.method != 'GET' && !req.headers.authorization && req.url.includes('/products/')) {
        return res.status(401).send({ error: 'You must be authorized to make this request.'});
    }
    next();
}

function print(obj){
    console.log(util.inspect(obj, false, 12, true));
}

function logInfRoutes(req, res, next) {
    loggerInfo.info(`${req.method} ${req.url}`);
    next();
}

function inexistentRoute(req, res, next) {
    loggerWarn.warn(`${req.method} ${req.url}`);
    res.status(404).json({
        error: -2,
        description: `Method ${req.method} not implemented to endpoint ${req.url}`
        });
    
}

function somethingWasBroke(err, req, res, next) {
    loggerErr.error(err);
    res.status(500).send('Something broke!');
  }


module.exports = {
    validateSecurity,
    print,
    logInfRoutes,
    inexistentRoute,
    somethingWasBroke
}
