import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";
import { authenticate } from "../middleware/auth.middleware";
import {
  createBlogSchema,
  updateBlogSchema,
  validate,
} from "../validation/blog.validation";

const router = Router();
const blogController = new BlogController();

router.get("/", blogController.getAll);
router.get("/:slug", blogController.getBySlug);

router.post(
  "/",
  authenticate,
  validate(createBlogSchema),
  blogController.create
);

router.put(
  "/:id",
  authenticate,
  validate(updateBlogSchema),
  blogController.update
);

router.delete("/:id", authenticate, blogController.delete);

export default router;
