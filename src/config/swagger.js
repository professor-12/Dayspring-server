import swagger from "swagger-jsdoc";

const definition = {
    openapi: "3.0.0",
    info: {
        title: "DaySpring API",
        version: "1.0.0",
        description: "API documentation for DaySpring",
        servers: [
            {
                url: "http://localhost:8000",
                description: "Development server",
            },
        ],
    },
};

const options = {
    definition,
    apis: ["./src/routes/*.js", "./src/controllers/*.js"],
    swaggerOptions: {
        docExpansion: "none",
        defaultModelsExpandDepth: -1,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
    },
};

const swaggerSpec = swagger(options);

export default swaggerSpec;
