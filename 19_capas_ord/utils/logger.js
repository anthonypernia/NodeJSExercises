const winston = require('winston')
const { splat, combine, timestamp, printf } = winston.format;
let logsFolder = "./logs";

const formatCust = printf(({ timestamp, level, message, meta }) => {
    return `${timestamp};${level}; ${message}; ${meta? JSON.stringify(meta) : ''}`;
  });


function createLogger(loggerLevel) {
    let logger =  new winston.createLogger({
        level: loggerLevel,
        colorize: true,
        prettyPrint: true,
        format: combine(
            timestamp(),
            splat(),
            formatCust
          ),
        transports: [
            new winston.transports.File({ filename: `${logsFolder}/${loggerLevel}.log` }),
            new winston.transports.Console()
        ]
    });


    return logger;
}


const loggerWarn = createLogger('warn');

const loggerErr = createLogger('error');

const loggerInfo = createLogger('info');


module.exports = {loggerWarn, loggerErr, loggerInfo};