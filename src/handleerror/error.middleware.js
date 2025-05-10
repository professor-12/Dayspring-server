import { ZodError } from "zod";

export const catchError = (error, req, res, next) => {
    console.log(error.stack);
    if (error instanceof SyntaxError) {
        return res.status(400).json({ message: "invalid JSON Format" });
    }

    if (error instanceof ZodError) {
        const formatted = error.errors.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));
        return res.status(400).json({ message: formatted });
    }
    if (error instanceof Error) {
        console.log("This is getting passed");
        return res.status(400).json({ message: error.message });
    }
    res.status(400).json({ message: "Bad request" });
};
