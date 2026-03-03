import express from "express";
import { getAllVideos, createVideo, getVideoById, likeVideo, addComment } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", createVideo);
router.put("/:id/like", likeVideo);
router.post("/:id/comment", protect, addComment);
router.get("/:id", getVideoById);

export default router;