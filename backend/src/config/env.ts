import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DB_PROVIDER: process.env.DB_PROVIDER || "json",

  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",

  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@example.com",

  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "password123",
};