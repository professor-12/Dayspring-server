import express from "express";
import { configDotenv } from "dotenv";
import auth from "./src/routes/auth.route.js";
// import products from "./src/routes/products.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import cart from "./src/routes/cart.routes.js";
import { catchError } from "./src/handleerror/error.middleware.js";
import cors from "cors";
const app = express();

configDotenv();
const PORT = process.env.PORT || 8001;

console.log(process.env.PORT);
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(catchError);
app.use("/api/auth", auth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", cart);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Dayspring API" });
});

app.listen(PORT, () => {
    console.log("Server is running in PORT: " + PORT);
});
