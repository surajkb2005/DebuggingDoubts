import express from "express";
import { getAllVideos, createVideo, getVideoById } from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", createVideo);
router.get("/:id", getVideoById);

export default router;