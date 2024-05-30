"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
require("dotenv/config");
// Init S3 client
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});
exports.default = s3;
//# sourceMappingURL=s3Client.js.map