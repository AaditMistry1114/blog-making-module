import { Blog } from "../types/blog.types";

export interface BlogRepository {
  getAll(): Promise<Blog[]>;
  getById(id: string): Promise<Blog | null>;
  getBySlug(slug: string): Promise<Blog | null>;
  create(blog: Blog): Promise<Blog>;
  update(id: string, blog: Blog): Promise<Blog | null>;
  delete(id: string): Promise<boolean>;
}