import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blog.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Backend Running 🚀",
  });
});

app.use("/blogs", blogRoutes);

export default app;