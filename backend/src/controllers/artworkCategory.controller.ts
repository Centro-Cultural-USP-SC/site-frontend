import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function listArtworkCategories(
    req: Request,
    res: Response
){
    const categories = await prisma.artworkCategory.findMany({
        orderBy:{
            name:"asc"
        }
    });

    res.json(categories);
}