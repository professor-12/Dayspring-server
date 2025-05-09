import { ZodError } from "zod";

export const catchError = (error, req, res, next) => {
    console.log("Catch error is getting called");
    console.log(error);
    if (error instanceof SyntaxError) {
        return res.status(400).json({ message: "invalid JSON Format" });
    }
    if (error instanceof ZodError) {
        return res.status(400).json({ message: "Error" });
    }
    if (error instanceof Error) {
        console.log("This is getting passed");
        return res.status(400).json({ message: error.message });
    }
    res.status(400).json({ message: "Bad request" });
};
