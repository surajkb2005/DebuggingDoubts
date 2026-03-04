//Backend/src/controllers/dashboardController.js
import Activity from "../models/Activity.js";

export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const watched = await Activity.countDocuments({ userId });

        const categoryStats = await Activity.aggregate([
            { $match: { userId: req.user._id } },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            watched,
            categoryStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};