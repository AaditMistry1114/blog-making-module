import { env } from "../config/env";
import { BlogRepository } from "./blog.repository";
import { JsonBlogRepository } from "./jsonBlog.repository";
import { MysqlBlogRepository } from "./mysqlBlog.repository";

export function createBlogRepository(): BlogRepository {
  if (env.DB_PROVIDER === "mysql") {
    return new MysqlBlogRepository();
  }

  return new JsonBlogRepository();
}
