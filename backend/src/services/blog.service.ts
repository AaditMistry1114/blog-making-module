import { BlogRepository } from "../repositories/blog.repository";
import { Blog } from "../types/blog.types";
import slugify from "slugify";
import { CreateBlogDto } from "../types/blog.dto";

export class BlogService {
  constructor(private repository: BlogRepository) {}

  async getAllBlogs(): Promise<Blog[]> {
    return this.repository.getAll();
  }

  async getBlogById(id: string): Promise<Blog | null> {
    return this.repository.getById(id);
  }

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    return this.repository.getBySlug(slug);
  }

  async createBlog(data: CreateBlogDto): Promise<Blog> {
    const blogs = await this.repository.getAll();

    const nextId =
      blogs.length > 0
        ? Math.max(...blogs.map((blog) => Number(blog.id))) + 1
        : 1;

    const now = new Date().toISOString();
    const slug = await this.generateUniqueSlug(data.title);

    const blog: Blog = {
      id: nextId.toString(),
      title: data.title,
      slug,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      published: data.published,
      createdAt: now,
      updatedAt: now,
      blocks: data.blocks,
    };

    return this.repository.create(blog);
  }

  async updateBlog(id: string, data: CreateBlogDto): Promise<Blog | null> {
    const existing = await this.repository.getById(id);

    if (!existing) {
      return null;
    }

    const now = new Date().toISOString();
    const slug = await this.generateUniqueSlug(data.title, id);

    const updatedBlog: Blog = {
      id: existing.id,
      createdAt: existing.createdAt,
      title: data.title,
      slug,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      published: data.published,
      updatedAt: now,
      blocks: data.blocks,
    };

    return this.repository.update(id, updatedBlog);
  }

  async deleteBlog(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  private async generateUniqueSlug(
    title: string,
    excludeId?: string
  ): Promise<string> {
    const baseSlug = slugify(title, { lower: true, strict: true });
    const blogs = await this.repository.getAll();

    let slug = baseSlug;
    let counter = 1;

    while (
      blogs.some((blog) => blog.slug === slug && blog.id !== excludeId)
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}
