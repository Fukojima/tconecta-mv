const {transports, config, format} = require('winston')
const {combine, timestamp, printf} = format
const winston = require('winston')

const logFormat = combine(
    timestamp({
        format: `DD/MM/YYYY - HH:mm:ss A`,
    }),
    printf(({level, message, timestamp}) => {
        if (level == 'error') {
            return `[${timestamp}] ${level}: ${message}`
        } else {
            return `[${timestamp}] ${message}`
        }
    }),
)

const logLevels = {
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warn: 4,
        notice: 5,
        info: 6,
        debug: 7,
    },
    colors: {
        emerg: 'red',
        alert: 'yellow',
        crit: 'red',
        error: 'red',
        warn: 'yellow',
        notice: 'green',
        info: 'cyan',
        debug: 'green',
    },
}

winston.addColors(logLevels)


const logger = function (filename) {
    return winston.createLogger({
        maxSize: '500m',
        levels: config.syslog.levels,
        format: combine(logFormat),
        colorize: true,
        transports: [
            new transports.File({
                filename: `./src/log/archives/${filename}.log`,
            }),
            new transports.Console({
                format: format.combine(winston.format.colorize({all: true}), logFormat),
            }),
        ],
        exceptionHandlers: [
            new transports.File({
                filename: './src/log/archives/exception.log',
            }),
        ],
    })
}

module.exports = logger
