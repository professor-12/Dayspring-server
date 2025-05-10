const catchAsync = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (err) {
            console.error(err, "From catchAsync");
            next(err);
        }
    };
};

export default catchAsync;
