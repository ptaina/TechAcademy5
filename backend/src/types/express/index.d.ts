
import { JwtPayload } from "../jwtPayload";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload;
  }
}
