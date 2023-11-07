const winston = require('winston')

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

let transports

if (process.env.NODE_ENV === "production") {
    transports = [
        new winston.transports.File({ 
            filename: "./error.log", 
            level: "warning",
            format: winston.format.simple() 
        })
    ]
} else {
    transports = [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        })
    ]
}

const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: transports
})

const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
    next()
}

module.exports = addLogger