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
                            date: "$watchedAt",
                            timezone: "Asia/Kolkata"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": -1 } }
        ]);

        const days = dailyProgress;

        let streak = 0;
        if (!days.length) {
            return res.json({
                watched,
                categoryStats,
                recentActivity,
                dailyProgress,
                streak: 0
            });
        }
        let prevDate = null;

        for (let i = 0; i < days.length; i++) {
            const d = new Date(days[i]._id);

            if (i === 0) {
                const today = new Date();
                const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));

                if (diff > 1) break;

                streak = 1;
                prevDate = d;
            } else {
                const diff = Math.floor((prevDate - d) / (1000 * 60 * 60 * 24));

                if (diff === 1) {
                    streak++;
                    prevDate = d;
                } else {
                    break;
                }
            }
        }

        res.json({
            watched,
            categoryStats,
            recentActivity,
            dailyProgress,
            streak
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};