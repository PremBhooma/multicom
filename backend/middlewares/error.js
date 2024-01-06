const ErrorHander = require("../utils/errorhander")

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //Wrong MongoDB Id Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}



module.exports = errorMiddleware;
