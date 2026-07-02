import fs from "fs/promises";
import { Request, Response } from "express";
import { cloudinary } from "../config/cloudinary";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/appError";

export class UploadController {
  uploadImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      throw new AppError(400, "No image file provided");
    }

    const filePath = req.file.path;

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "blog-uploads",
      });

      return res.status(200).json({ url: result.secure_url });
    } finally {
      await fs.unlink(filePath).catch(() => undefined);
    }
  });
}
