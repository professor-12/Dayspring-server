const catchasync = (controllers) => {
    return async (req, res, next) => {
        try {
            controllers(req, res, next);
        } catch (err) {
            console.log(err, "From catch Async");
            return nez;
        }
    };
};

export default catchasync;
