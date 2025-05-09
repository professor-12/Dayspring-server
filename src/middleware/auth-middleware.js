import jwt from "jsonwebtoken";
export async function chechAuth(req, res, next) {
    const tokens = req.headers.authorization?.split(" ");
    try {
        if (!tokens) {
            return res
                .status(401)
                .json({ message: "No auth credentials provided" });
        }
        if (tokens[0] !== "Bearer" || !tokens[1]) {
            return res.status(400).json({ message: "Not authorized" });
        }
        const user = jwt.verify(tokens[1], process.env.JWT_SECRET);
        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Not authenticated" });
    }
}
