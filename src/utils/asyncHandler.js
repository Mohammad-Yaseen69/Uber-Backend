const asyncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next)
    } catch (error) {
        console.log(error.statusCode)
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    asyncHandler
}