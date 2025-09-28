import { Router } from "express";
import { createPosts, getPosts } from "../controllers/posts.controller";

const router: Router = Router()

router.post("/posts", createPosts)
router.get("/posts", getPosts)

export default router