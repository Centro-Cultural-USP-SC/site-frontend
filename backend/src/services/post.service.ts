import prisma from "../config/prisma";

interface CreatePostInput {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  published?: boolean;
  authorId: number;
}

class PostService {
  async create(data: CreatePostInput) {
    return prisma.post.create({
      data,
    });
  }

  async list() {
    return prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.post.findUnique({
      where: {
        slug,
      },
    });
  }

  async update(id: number, data: Partial<{
    title: string;
    slug: string;
    summary: string;
    content: string;
    published: boolean;
  }>) {
    return prisma.post.update({
      where: { id },
      data,
    });   
  }

  async delete(id: number) {
    return prisma.post.delete({
      where: { id },
    });
  }

  async findById(id: number) {
    return prisma.post.findUnique({
      where: { id },
    });
  }

}

export default new PostService();