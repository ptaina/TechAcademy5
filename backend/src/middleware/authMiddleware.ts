import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "../types/jwtPayload";


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token" });
  }

  try {
    const decoded = verifyToken(token) as JwtPayload;

    console.log("Token decodificado no middleware:", decoded);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Access denied. Invalid token" });
  }
};
