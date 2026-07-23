export type PostCategory =
  | "EXPOSICAO"
  | "ACERVO";

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  category: PostCategory;
  coverImage?: string;
  published: boolean;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  location?: string;
  coverImage?: string;
  startDate: string;
  endDate?: string;
  published: boolean;
}

export type ArtworkCategory = {
  id:number;
  name:string;
  slug:string;
};


export type Artwork = {
  id:number;
  registrationNumber?:string;
  patrimonyNumber?:string;
  title:string;
  slug:string;
  chronology?:string;
  authorship?:string;
  technique?:string;
  dimensions?:string;
  description?:string;
  responsible?:string;
  physicalLocation?:string;
  conservationState?:string;
  internalNotes?:string; 
  authorBiography?:string;
  coverImage?:string;
  category:ArtworkCategory;
};