class ApiError{
    constructor(statusCode, message){
        this.statusCode = statusCode
        this.message = message
        this.status = false
    }
}

export {
    ApiError
}