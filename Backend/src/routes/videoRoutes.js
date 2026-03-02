import express from "express";
import { getAllVideos, createVideo, getVideoById, likeVideo, addComment } from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", createVideo);
router.get("/:id", getVideoById);
router.put("/:id/like", likeVideo);
router.post("/:id/comments", addComment);

export default router;