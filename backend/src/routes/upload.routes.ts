import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { upload } from "../config/multer";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const uploadController = new UploadController();

router.post(
  "/",
  authenticate,
  upload.single("image"),
  uploadController.uploadImage
);

export default router;
