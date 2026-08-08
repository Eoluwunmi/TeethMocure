import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";
import { ApiError } from "../middleware/errorHandler";
import { prisma } from "../lib/prisma";

const router = Router();

// Get all marketers (admin only)
router.get("/marketers", authMiddleware, adminMiddleware, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const marketers = await prisma.marketer.findMany({
      include: {
        user: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(marketers);
  } catch (error) {
    next(error);
  }
});

// Update marketer status (admin only)
router.patch("/marketers/:id/status", authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = typeof req.body.status === "string" ? req.body.status : "";
    const id = req.params.id as string;

    if (!["pending", "approved", "rejected", "suspended"].includes(status)) {
      throw new ApiError(400, "Invalid status");
    }

    const marketer = await prisma.marketer.findUnique({
      where: { id },
    });

    if (!marketer) {
      throw new ApiError(404, "Marketer not found");
    }

    const updated = await prisma.marketer.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Get all leads (admin only)
router.get("/leads", authMiddleware, adminMiddleware, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(leads);
  } catch (error) {
    next(error);
  }
});

// Get all orders (admin only)
router.get("/orders", authMiddleware, adminMiddleware, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
});

export default router;
