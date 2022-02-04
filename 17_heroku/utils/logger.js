const winston = require('winston')
let logsFolder = "./logs";

const loggerWarn = new winston.createLogger({
    level: 'warn',
    transports: [
        new winston.transports.File({ filename: `${logsFolder}/warn.log` }),
        new winston.transports.Console( level = 'verbose' )
    ]
});

const loggerErr = new winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.File({ filename: `${logsFolder}/error.log` }),
        new winston.transports.Console( level = 'verbose' )
    ]
});

const loggerInfo = new winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console( level = 'verbose' )
    ]
});


module.exports = {loggerWarn, loggerErr, loggerInfo};