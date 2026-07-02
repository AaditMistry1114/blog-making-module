import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DB_PROVIDER: process.env.DB_PROVIDER || "json",

  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",

  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@example.com",

  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "password123",

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",

  MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
  MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3306,
  MYSQL_USER: process.env.MYSQL_USER || "root",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "blog_db",
};
