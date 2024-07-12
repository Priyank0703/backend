export const globalErrHandler = (err , req , res , next) => {
    const stack = err?.stack;
    const statusCode = err?.status ? err?.status : 500;
    const message = err?.message;
    res.status(statusCode).json({
        stack,
        message,
    })
}
 
// 404 error handler 

export const notFound = (req , res, next) => {
    const err = new Error(`Route ${req.originalUrl} Not Found`);
    next(err);
}