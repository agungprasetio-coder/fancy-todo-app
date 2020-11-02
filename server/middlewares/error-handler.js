module.exports = function (err, req, res, next) {
    let status = err.status || 500
    let msg = err.msg || 'Internal Server Error'
    if(err.name === 'SequelizeValidationError'){
        const listErrors = err.errors.map(error=>{
            return error.message
        })
        status = 400
        msg = listErrors.join(', ')  
    }
    else if(err.name === 'SequelizeUniqueConstraintError'){
        status = 400
        msg = err.errors.map(error=>{
            return error.message
        }).join(', ')
    }
    res.status(status).json({error: msg})
}