import express from "express";
import { getAllVideos, createVideo, getVideoById, likeVideo, addComment } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", protect, adminOnly, createVideo);
router.put("/:id/like", protect, likeVideo);
router.post("/:id/comments", protect, addComment);
router.get("/:id", protect, getVideoById);

export default router;