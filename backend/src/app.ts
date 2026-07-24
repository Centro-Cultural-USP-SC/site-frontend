import express from "express";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import postRoutes from "./routes/post.routes";
import eventRoutes from "./routes/event.routes";
import artworkRoutes from "./routes/artwork.routes";
import artworkCategoryRoutes from "./routes/artworkCategory.routes";
import uploadRoutes from "./routes/upload.routes";
import path from "path";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.resolve("uploads")
  )
);

app.use("/health", healthRoutes);

app.use("/auth", authRoutes);

app.use("/admin", adminRoutes);

app.use("/posts", postRoutes);

app.use("/events", eventRoutes);

app.use( "/artworks", artworkRoutes);

app.use("/artwork-categories", artworkCategoryRoutes);

app.use("/upload", uploadRoutes);

export default app;