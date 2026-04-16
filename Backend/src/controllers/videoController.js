//Backend/src/controllers/videoController.js
import Video from "../models/Video.js";
import Activity from "../models/Activity.js";
// GET all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new video
export const createVideo = async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Increase views automatically
    video.views += 1;
    await video.save();

    // Track learning activity
    if (req.user) {
      await Activity.create({
        userId: req.user._id,
        videoId: video._id,
        category: video.category
      });
    }


    res.status(200).json(video);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const userId = req.user.id;

    // Check if already liked
    if (video.likedBy.includes(userId)) {
      // UNLIKE (toggle behavior)
      video.likedBy = video.likedBy.filter(
        (id) => id.toString() !== userId
      );
      video.likes -= 1;
    } else {
      // LIKE
      video.likedBy.push(userId);
      video.likes += 1;

      await Activity.create({
        userId: req.user._id,
        videoId: video._id,
        category: video.category,
        type: "like"
      });
    }

    await video.save();



    res.status(200).json({
      likes: video.likes,
      liked: video.likedBy.includes(userId)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.comments.push({ text: req.body.text });
    await video.save();

    await Activity.create({
      userId: req.user._id,
      videoId: video._id,
      category: video.category,
      type: "comment"
    });

    res.status(200).json(video.comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};