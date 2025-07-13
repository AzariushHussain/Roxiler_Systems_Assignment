const db = require('../models/index');
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await db.User.count();
        const totalStores = await db.Store.count();
        const totalRatings = await db.Rating.count();
        res.status(200).json({
            totalUsers,
            totalStores,
            totalRatings
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};