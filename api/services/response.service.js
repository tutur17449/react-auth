exports.sendApiSuccessResponse = (res, status, data, message) =>{
    return res.status(status).send({
        ok : true,
        status: status,
        message : message,
        error : null,
        data : data  
    })
}

exports.sendApiErrorResponse = (res, status, err, message)=>{
    return res.status(status).json({
        ok : false,
        status: status,
        message : message,
        error : err,
        data : null        
    })
}

exports.sendBodyError = (res, status, message) => {
    return res.status(status).json({
        ok : false,
        status: status,
        message: message,
        err: null,
        data: null,
    })
}

exports.sendFieldsError = (res, status, message, miss, extra) => {
    return res.status(status).json({
        ok : false,
        status: status,
        message: message,
        err: { miss, extra },
        data: null,
    })
}