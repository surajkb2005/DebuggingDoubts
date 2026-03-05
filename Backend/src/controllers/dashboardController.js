//Backend/src/controllers/dashboardController.js
import Activity from "../models/Activity.js";

export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const watched = await Activity.countDocuments({ userId });

        const categoryStats = await Activity.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        const recentActivity = await Activity.find({ userId })
            .sort({ watchedAt: -1 })
            .limit(5)
            .populate("videoId", "title");

        const dailyProgress = await Activity.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$watchedAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.json({
            watched,
            categoryStats,
            recentActivity,
            dailyProgress
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};