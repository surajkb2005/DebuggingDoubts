import Activity from "../models/Activity.js";
import Video from "../models/Video.js";

export const getRecommendations = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Get user's watched categories frequency
        const categoryStats = await Activity.aggregate([
            { $match: { userId: req.user._id } },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 3 } // top 3 interests
        ]);

        const topCategories = categoryStats.map(c => c._id);

        // 2. Get watched videos (to exclude)
        const watched = await Activity.find({ userId }).select("videoId");
        const watchedIds = watched.map(w => w.videoId);

        // 3. Find recommended videos
        const recommendations = await Video.find({
            category: { $in: topCategories },
            _id: { $nin: watchedIds }
        })
            .sort({ views: -1, createdAt: -1 })
            .limit(12);

        res.json(recommendations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};