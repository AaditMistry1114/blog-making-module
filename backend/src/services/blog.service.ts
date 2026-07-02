import { BlogRepository } from "../repositories/blog.repository";
import { Blog } from "../types/blog.types";
import slugify from "slugify";
import { CreateBlogDto } from "../types/blog.dto";

export class BlogService {
  constructor(private repository: BlogRepository) {}

  async getAllBlogs(): Promise<Blog[]> {
    return this.repository.getAll();
  }

  async getBlogById(id: string) {
    return this.repository.getById(id);
  }

  async getBlogBySlug(slug: string) {
    return this.repository.getBySlug(slug);
  }
  async createBlog(data: CreateBlogDto): Promise<Blog> {
  const blogs = await this.repository.getAll();

  const nextId =
    blogs.length > 0
      ? Math.max(...blogs.map((blog) => Number(blog.id))) + 1
      : 1;

  const now = new Date().toISOString();

  const blog: Blog = {
    id: nextId.toString(),
    title: data.title,
    slug: slugify(data.title, {
      lower: true,
      strict: true,
    }),
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    published: data.published,
    createdAt: now,
    updatedAt: now,
    blocks: data.blocks,
  };

  return this.repository.create(blog);
}
}
