import express from "express";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import postRoutes from "./routes/post.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/health", healthRoutes);

app.use("/auth", authRoutes);

app.use("/admin", adminRoutes);

app.use("/posts", postRoutes);

export default app;