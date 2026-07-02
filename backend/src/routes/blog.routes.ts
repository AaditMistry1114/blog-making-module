// src/routes/blog.routes.ts

import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";

const router = Router();
const blogController = new BlogController();

router.get("/", blogController.getAll.bind(blogController));
router.get("/:slug", blogController.getBySlug.bind(blogController));
router.post("/", blogController.create.bind(blogController));

export default router;