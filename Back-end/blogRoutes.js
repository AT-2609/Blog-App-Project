import express from "express";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const author = req.user.id;

  const blog = new Blog({
    title,
    content,
    author,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
