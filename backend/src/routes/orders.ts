import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";
import { ApiError } from "../middleware/errorHandler";
import { prisma } from "../lib/prisma";

const router = Router();

function toStr(val: any): string | null {
  if (typeof val === "string") return val || null;
  if (Array.isArray(val)) return (val[0] as string) || null;
  return null;
}

router.post("/", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fullName = toStr(req.body.fullName);
    const phone = toStr(req.body.phone);
    const email = toStr(req.body.email);
    const address = toStr(req.body.address);
    const state = toStr(req.body.state);
    const pkg = toStr(req.body.package);
    const paymentMethod = toStr(req.body.paymentMethod);
    const marketerCode = toStr(req.body.marketerCode);

    if (!fullName || !phone || !address || !state || !pkg || !paymentMethod) {
      throw new ApiError(400, "Missing required fields");
    }

    const order = await prisma.order.create({
      data: {
        userId: req.user!.userId,
        fullName,
        phone,
        email,
        address,
        state,
        package: pkg,
        paymentMethod,
        marketerCode,
        status: "pending",
      },
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (order.userId !== req.user!.userId && req.user!.role !== "admin") {
      throw new ApiError(403, "Forbidden");
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", authMiddleware, adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const status = toStr(req.body.status);

    if (!status) {
      throw new ApiError(400, "Status is required");
    }

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

export default router;
