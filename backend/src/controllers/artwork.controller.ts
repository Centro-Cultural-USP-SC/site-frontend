import {Request, Response} from "express";

import {
    getAllArtworks,
    getArtworkBySlug,
    createArtwork,
    updateArtwork,
    deleteArtwork
} from "../services/artwork.service";

export async function listArtworks(req: Request, res: Response){
    const artworks = await getAllArtworks();
    res.json(artworks);

}

export async function showArtwork(req: Request, res: Response){
    const slug = String(req.params.slug);
    const artwork = await getArtworkBySlug(slug);

    if(!artwork){
        return res.status(404).json({
            message:"Obra não encontrada"
        });
    }
    res.json(artwork);
}

export async function createArtworkController(req:Request, res:Response){
    try{
        const artwork = await createArtwork(
            req.body
        );
        res.status(201).json(artwork);
    }
   catch(error){
    console.error(error);
    res.status(500).json({
        message:"Erro ao criar obra"
    });
}
}
export async function updateArtworkController(req: Request,res: Response){
    const artwork = await updateArtwork(
        Number(req.params.id),
        req.body
    );
    res.json(artwork);
}

export async function deleteArtworkController(req: Request,res: Response) {
  const artwork =
    await deleteArtwork(
      Number(req.params.id)
    );
  res.json(artwork);
}