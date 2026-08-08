import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { prisma } from "../lib/prisma";

const router = Router();

function generateReferralCode(): string {
  return "MKT" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function toStr(val: any): string | null {
  if (typeof val === "string") return val || null;
  if (Array.isArray(val)) return (val[0] as string) || null;
  return null;
}

router.post("/", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phone = toStr(req.body.phone);
    const bankName = toStr(req.body.bankName);
    const accountNumber = toStr(req.body.accountNumber);
    const accountName = toStr(req.body.accountName);

    if (!phone) {
      throw new ApiError(400, "Phone is required");
    }

    const existing = await prisma.marketer.findUnique({
      where: { userId: req.user!.userId },
    });

    if (existing) {
      throw new ApiError(400, "You are already registered as a marketer");
    }

    const referralCode = generateReferralCode();

    const marketer = await prisma.marketer.create({
      data: {
        userId: req.user!.userId,
        phone,
        referralCode,
        status: "pending",
        bankName,
        accountNumber,
        accountName,
      },
    });

    res.status(201).json(marketer);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const marketer = await prisma.marketer.findUnique({
      where: { id },
      include: { user: { select: { email: true, fullName: true } } },
    });

    if (!marketer) {
      throw new ApiError(404, "Marketer not found");
    }

    res.json(marketer);
  } catch (error) {
    next(error);
  }
});

router.get("/code/:referralCode", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const referralCode = req.params.referralCode as string;
    const marketer = await prisma.marketer.findUnique({
      where: { referralCode },
    });

    if (!marketer) {
      throw new ApiError(404, "Marketer not found");
    }

    res.json(marketer);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const marketer = await prisma.marketer.findUnique({
      where: { id },
    });

    if (!marketer) {
      throw new ApiError(404, "Marketer not found");
    }

    if (marketer.userId !== req.user!.userId) {
      throw new ApiError(403, "Forbidden");
    }

    const phone = toStr(req.body.phone);
    const bankName = toStr(req.body.bankName);
    const accountNumber = toStr(req.body.accountNumber);
    const accountName = toStr(req.body.accountName);

    const updated = await prisma.marketer.update({
      where: { id },
      data: {
        phone: phone || marketer.phone,
        bankName: bankName || marketer.bankName,
        accountNumber: accountNumber || marketer.accountNumber,
        accountName: accountName || marketer.accountName,
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

export default router;
