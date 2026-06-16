import { Request, Response } from "express";
import postService from "../services/post.service";

class PostController {
  async create(req: Request, res: Response) {
    try {
      const {
        title,
        slug,
        summary,
        content,
        published,
      } = req.body;

      const post = await postService.create({
        title,
        slug,
        summary,
        content,
        published,
        authorId:  (req as any).user.userId,
      });

      return res.status(201).json(post);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Error creating post",
      });
    }
  }

  async list(req: Request, res: Response) {
    const posts = await postService.list();

    return res.json(posts);
  }

  async findBySlug(req: Request, res: Response) {
    const post = await postService.findBySlug(
      String(req.params.slug)
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.json(post);
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log("UPDATE HIT", req.params.id, req.body);
      const post = await postService.update(id, req.body);
      
      return res.json(post);
    } catch (error) {
      return res.status(500).json({
        message: "Error updating post",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log("DELETE HIT", req.params.id);
      await postService.delete(id);

      return res.json({ message: "Post deleted" });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting post",
      });
    }

  }

}

export default new PostController();