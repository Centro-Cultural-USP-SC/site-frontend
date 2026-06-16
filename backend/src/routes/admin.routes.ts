import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    return res.json({
      user: (req as any).user
    });
  }
);

export default router;