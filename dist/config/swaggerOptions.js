"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chat bot API Documentation',
            version: '1.0.0',
            description: 'API documentation for Chat bot project.',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            securitySchemes: {
                JWTAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
                JWTAuth: []
            }]
    },
    apis: ['./dist/routes/Routes.js'],
};
// Modify the Swagger options dynamically to include security requirements for specific paths
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(swaggerOptions);
// Loop through each path and add security requirement if middleware is specified
for (const pathKey in swaggerSpec.paths) {
    const path = swaggerSpec.paths[pathKey];
    if (path.middleware) {
        // Add security requirement only for endpoints with middleware specified
        path.security = [{ JWTAuth: [] }];
    }
}
exports.default = swaggerSpec;
//# sourceMappingURL=swaggerOptions.js.map