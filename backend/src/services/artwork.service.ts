import prisma from "../config/prisma";


export async function getAllArtworks(){

    return prisma.artwork.findMany({
        include:{
            category:true
        }
    });

}


export async function getArtworkBySlug(slug:string){

    return prisma.artwork.findUnique({
        where:{
            slug
        },
        include:{
            category:true
        }
    });

}

export async function createArtwork(data:any){
    return prisma.artwork.create({
        data:{
            title: data.title,
            slug: data.slug,
            categoryId: data.categoryId,
            registrationNumber: data.registrationNumber,
            patrimonyNumber: data.patrimonyNumber,
            chronology: data.chronology,
            authorship: data.authorship,
            technique: data.technique,
            dimensions: data.dimensions,
            description: data.description,
            responsible: data.responsible,
            physicalLocation: data.physicalLocation,
            conservationState: data.conservationState,
            internalNotes: data.internalNotes,
            authorBiography: data.authorBiography,
            coverImage: data.coverImage
        }
    });

}

export async function updateArtwork(id:number,data:any){

    return prisma.artwork.update({
        where:{ id },
        data
    });

}

export async function deleteArtwork(id: number) {
  return prisma.artwork.delete({
    where: {
      id,
    },
  });
}