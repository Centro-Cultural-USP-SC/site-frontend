import {Router} from "express";

import {
    listArtworkCategories
} from "../controllers/artworkCategory.controller";

const router = Router();

router.get( "/", listArtworkCategories);

export default router;