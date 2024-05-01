"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Type Guard для JwtPayload
const isJwtPayload = (decoded) => {
    return typeof decoded !== 'string' && 'userId' in decoded;
};
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'default_secret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        // check is expired 
        if (typeof decoded === 'object' && 'exp' in decoded) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp && currentTime > decoded.exp) {
                return res.status(401).json({ message: 'Token expired' });
            }
        }
        if (isJwtPayload(decoded)) {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    });
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map