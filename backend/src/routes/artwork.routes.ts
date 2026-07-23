import {Router} from "express";

import {
    listArtworks,
    showArtwork,
    createArtworkController,
    updateArtworkController, 
    deleteArtworkController
} from "../controllers/artwork.controller";

const router = Router();

router.get(  "/", listArtworks);

router.get( "/:slug",  showArtwork);

router.post( "/", createArtworkController);

router.put("/:id", updateArtworkController);

router.delete("/:id", deleteArtworkController);

export default router;