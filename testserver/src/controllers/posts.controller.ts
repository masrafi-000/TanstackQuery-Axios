import { Request, Response } from "express";
import Posts from "../models/posts.model";

export const createPosts = async (req: Request, res: Response) => {
  try {
    const { username, title, description } = req.body;

    if (!username || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPosts = new Posts({
      username,
      title,
      description,
    });
    const savedPosts = await newPosts.save();
    res.status(201).json(savedPosts);
  } catch (error) {
    if ((error as any).code === 11000) {
      return res
        .status(409)
        .json({ message: "Error: this username already exists." });
    }
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
