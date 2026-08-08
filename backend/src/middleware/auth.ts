import { Request, Response, NextFunction } from "express";
import { verifyToken, extractTokenFromHeader, TokenPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = extractTokenFromHeader(req.headers.authorization);

  if (!token) {
    res.status(401).json({ error: "Missing authorization token" });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  req.user = payload;

  // Note: RLS policies are enforced at the database level
  // The user context is available via the JWT payload and should be validated
  // by the application logic before executing queries.
  // For true RLS enforcement, you would need to set session variables
  // on the database connection before each query.

  next();
}
