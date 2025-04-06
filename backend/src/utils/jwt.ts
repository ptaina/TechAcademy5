import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwtPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_bem_secreto';
const JWT_EXPIRES_IN = '7d';

export const generateToken = (user: JwtPayload): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
