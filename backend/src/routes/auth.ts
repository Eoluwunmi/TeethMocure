import { Router, Request, Response, NextFunction } from "express";
import { hashPassword, verifyPassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { authMiddleware } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { prisma } from "../lib/prisma";

const router = Router();

function toStr(val: any): string | null {
  if (typeof val === "string") return val || null;
  if (Array.isArray(val)) return (val[0] as string) || null;
  return null;
}

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = toStr(req.body.email);
    const password = toStr(req.body.password);
    const fullName = toStr(req.body.fullName);

    if (!email || !password || !fullName) {
      throw new ApiError(400, "Email, password, and full name are required");
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ApiError(400, "Email already registered");
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        role: "user",
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = toStr(req.body.email);
    const password = toStr(req.body.password);

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/profile", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
