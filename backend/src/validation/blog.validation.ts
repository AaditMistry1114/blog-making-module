import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const blockTypeSchema = z.enum([
  "heading",
  "subheading",
  "paragraph",
  "image",
  "quote",
  "code",
  "divider",
]);

const blockSchema = z.object({
  id: z.string().min(1, "Block id is required"),
  type: blockTypeSchema,
  data: z.record(z.string(), z.unknown()),
});

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  coverImage: z.string(),
  published: z.boolean(),
  blocks: z.array(blockSchema).min(1, "At least one block is required"),
});

export const updateBlogSchema = createBlogSchema;

type Schema = z.ZodType<unknown>;

export const validate =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    req.body = result.data;
    next();
  };
