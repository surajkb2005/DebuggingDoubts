import express from "express";
import { getAllVideos, createVideo } from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", createVideo);

export default router;