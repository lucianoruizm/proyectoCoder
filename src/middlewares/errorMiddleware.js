const EErrors = require("../services/errors/enums")

const ErrorMiddleware = (error, req, res, next) => {
    console.log("ErrorMiddleware|||||||")
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            console.log("ErrorMiddleware INVALID_TYPES_ERROR")
            return res.status(400).json({ code: error.code, error: error.name });
        default:
            console.log("ErrorMiddleware default")
            return res.status(500).json({ error: 'Error Inesperado' });
    }
}

module.exports = ErrorMiddleware