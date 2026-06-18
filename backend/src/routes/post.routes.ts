import { Router } from "express";

import postController from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", postController.list);

router.get(
  "/exposicoes",
  postController.getExposicoes
);

router.get(
  "/acervo",
  postController.getAcervo
);

router.post(
  "/",
  authMiddleware,
  postController.create
);

router.get("/:slug", postController.findBySlug);
router.put("/:id", authMiddleware, postController.update);
router.delete("/:id", authMiddleware, postController.delete);

export default router;