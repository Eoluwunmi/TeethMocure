import { Router, Request, Response, NextFunction } from "express";
import { ApiError } from "../middleware/errorHandler";
import { prisma } from "../lib/prisma";

const router = Router();

function toStr(val: any): string | null {
  if (typeof val === "string") return val || null;
  if (Array.isArray(val)) return (val[0] as string) || null;
  return null;
}

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phone = toStr(req.body.phone);
    const email = toStr(req.body.email);
    const source = toStr(req.body.source);
    const message = toStr(req.body.message);

    if (!phone) {
      throw new ApiError(400, "Phone is required");
    }

    const lead = await prisma.lead.create({
      data: {
        phone,
        email,
        source,
        message,
      },
    });

    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
});

export default router;
