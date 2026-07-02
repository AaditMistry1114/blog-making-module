// src/repositories/jsonBlog.repository.ts

import fs from "fs/promises";
import path from "path";

import { Blog } from "../types/blog.types";
import { BlogRepository } from "./blog.repository";

export class JsonBlogRepository implements BlogRepository {
  private readonly filePath = path.join(
    __dirname,
    "../seed/blogs.json"
  );

  private async readBlogs(): Promise<Blog[]> {
    const data = await fs.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  private async writeBlogs(blogs: Blog[]): Promise<void> {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(blogs, null, 2)
    );
  }

  async getAll(): Promise<Blog[]> {
    return this.readBlogs();
  }

  async getById(id: string): Promise<Blog | null> {
    const blogs = await this.readBlogs();

    return blogs.find((blog) => blog.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<Blog | null> {
    const blogs = await this.readBlogs();

    return blogs.find((blog) => blog.slug === slug) ?? null;
  }

  async create(blog: Blog): Promise<Blog> {
    const blogs = await this.readBlogs();

    blogs.push(blog);

    await this.writeBlogs(blogs);

    return blog;
  }

  async update(id: string, updatedBlog: Blog): Promise<Blog | null> {
    const blogs = await this.readBlogs();

    const index = blogs.findIndex((blog) => blog.id === id);

    if (index === -1) {
      return null;
    }

    blogs[index] = updatedBlog;

    await this.writeBlogs(blogs);

    return updatedBlog;
  }

  async delete(id: string): Promise<boolean> {
    const blogs = await this.readBlogs();

    const filteredBlogs = blogs.filter((blog) => blog.id !== id);

    if (filteredBlogs.length === blogs.length) {
      return false;
    }

    await this.writeBlogs(filteredBlogs);

    return true;
  }
}