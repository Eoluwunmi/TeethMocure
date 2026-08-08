import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import orderRoutes from "./routes/orders";
import marketerRoutes from "./routes/marketers";
import leadRoutes from "./routes/leads";
import adminRoutes from "./routes/admin";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/marketers", marketerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
