/**
 * Wrapper function to catch errors in async route handlers
 * Eliminates the need for try-catch blocks in every route handler
 * Usage: router.get('/', catchAsync(controller.getAll));
 */
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

module.exports = catchAsync;
