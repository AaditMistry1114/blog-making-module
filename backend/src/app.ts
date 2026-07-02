import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blog.routes";
import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";
import { errorHandler } from "./middleware/error.middleware";
import { AppError } from "./utils/appError";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Backend Running 🚀",
  });
});

app.use("/blogs", blogRoutes);
app.use(authRoutes);
app.use("/upload", uploadRoutes);

app.use((_req, _res, next) => {
  next(new AppError(404, "Route not found"));
});

app.use(errorHandler);

export default app;
