import { Router } from "express";

import postController from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", postController.list);

router.get("/:slug", postController.findBySlug);

router.post(
  "/",
  authMiddleware,
  postController.create
);
router.put("/:id", authMiddleware, postController.update);
router.delete("/:id", authMiddleware, postController.delete);

export default router;