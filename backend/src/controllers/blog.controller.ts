import { Request, Response } from "express";
import { BlogService } from "../services/blog.service";
import { createBlogRepository } from "../repositories/repository.factory";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/appError";
import { CreateBlogDto } from "../types/blog.dto";

const blogService = new BlogService(createBlogRepository());

export class BlogController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const blogs = await blogService.getAllBlogs();
    return res.status(200).json(blogs);
  });

  getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = req.params.slug as string;
    const blog = await blogService.getBlogBySlug(slug);

    if (!blog) {
      throw new AppError(404, "Blog not found");
    }

    return res.status(200).json(blog);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const blog = await blogService.createBlog(req.body as CreateBlogDto);
    return res.status(201).json(blog);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const blog = await blogService.updateBlog(id, req.body as CreateBlogDto);

    if (!blog) {
      throw new AppError(404, "Blog not found");
    }

    return res.status(200).json(blog);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const deleted = await blogService.deleteBlog(id);

    if (!deleted) {
      throw new AppError(404, "Blog not found");
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  });
}
