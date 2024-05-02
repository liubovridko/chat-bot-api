import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    userId?: any; 
}
// Type Guard для JwtPayload
const isJwtPayload = (decoded: string | JwtPayload): decoded is JwtPayload => {
    return typeof decoded !== 'string' && 'userId' in decoded;
};

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY || 'default_secret', (err, decoded) => {
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
        }  else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    });
};
