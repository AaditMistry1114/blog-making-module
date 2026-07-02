// src/controllers/blog.controller.ts

import { Request, Response } from "express";
import { BlogService } from "../services/blog.service";
import { JsonBlogRepository } from "../repositories/jsonBlog.repository";

const repository = new JsonBlogRepository();
const blogService = new BlogService(repository);

export class BlogController {
  async getAll(req: Request, res: Response) {
    const blogs = await blogService.getAllBlogs();

    return res.status(200).json(blogs);
  }

  async getBySlug(req: Request, res: Response) {
    const slug = req.params.slug as string;

    const blog = await blogService.getBlogBySlug(slug);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json(blog);
  }

  async create(req: Request, res: Response) {
    const blog = await blogService.createBlog(req.body);

    return res.status(201).json(blog);
  }
}