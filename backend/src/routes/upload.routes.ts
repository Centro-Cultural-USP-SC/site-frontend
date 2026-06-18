import { Router } from "express";

import multer from "../config/multer";

import { authMiddleware }
from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  multer.single("file"),
  (req, res) => {

    if (!req.file) {
      return res
        .status(400)
        .json({
          message:
            "File not provided",
        });
    }

    return res.json({
      imageUrl:
        `/uploads/${req.file.filename}`,
    });
  }
);

export default router;