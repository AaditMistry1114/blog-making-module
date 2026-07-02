import mysql, { RowDataPacket } from "mysql2/promise";
import { env } from "../config/env";
import { Blog } from "../types/blog.types";
import { BlogRepository } from "./blog.repository";

interface BlogRow extends RowDataPacket {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  published: number;
  createdAt: string;
  updatedAt: string;
  blocks: string | Blog["blocks"];
}

export class MysqlBlogRepository implements BlogRepository {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  private mapRow(row: BlogRow): Blog {
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      coverImage: row.coverImage,
      published: Boolean(row.published),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      blocks:
        typeof row.blocks === "string"
          ? (JSON.parse(row.blocks) as Blog["blocks"])
          : row.blocks,
    };
  }

  async getAll(): Promise<Blog[]> {
    const [rows] = await this.pool.query<BlogRow[]>(
      "SELECT * FROM blogs ORDER BY createdAt ASC"
    );

    return rows.map((row) => this.mapRow(row));
  }

  async getById(id: string): Promise<Blog | null> {
    const [rows] = await this.pool.query<BlogRow[]>(
      "SELECT * FROM blogs WHERE id = ? LIMIT 1",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapRow(rows[0]);
  }

  async getBySlug(slug: string): Promise<Blog | null> {
    const [rows] = await this.pool.query<BlogRow[]>(
      "SELECT * FROM blogs WHERE slug = ? LIMIT 1",
      [slug]
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapRow(rows[0]);
  }

  async create(blog: Blog): Promise<Blog> {
    await this.pool.query(
      `INSERT INTO blogs (id, title, slug, excerpt, coverImage, published, createdAt, updatedAt, blocks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        blog.id,
        blog.title,
        blog.slug,
        blog.excerpt,
        blog.coverImage,
        blog.published,
        blog.createdAt,
        blog.updatedAt,
        JSON.stringify(blog.blocks),
      ]
    );

    return blog;
  }

  async update(id: string, updatedBlog: Blog): Promise<Blog | null> {
    const [result] = await this.pool.query<mysql.ResultSetHeader>(
      `UPDATE blogs
       SET title = ?, slug = ?, excerpt = ?, coverImage = ?, published = ?, updatedAt = ?, blocks = ?
       WHERE id = ?`,
      [
        updatedBlog.title,
        updatedBlog.slug,
        updatedBlog.excerpt,
        updatedBlog.coverImage,
        updatedBlog.published,
        updatedBlog.updatedAt,
        JSON.stringify(updatedBlog.blocks),
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return updatedBlog;
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await this.pool.query<mysql.ResultSetHeader>(
      "DELETE FROM blogs WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}
