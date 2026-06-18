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