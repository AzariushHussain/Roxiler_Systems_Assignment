const db = require('../models/index');
const Rating = db.Rating;
const formatMessage = require('../utils/messageFormatter');
const { responseMessages } = require('../utils/constants');

createOrUpdateRating = async (userId, storeId, ratingValue) => {
  const existing = await Rating.findOne({
    where: { user_id: userId, store_id: storeId }
  });

  if (existing) {
    existing.rating = ratingValue;
    await existing.save();
    return { rating: existing, isUpdated: true };
  }

  const newRating = await Rating.create({
    user_id: userId,
    store_id: storeId,
    rating: ratingValue
  });

  return { rating: newRating, isUpdated: false };
};


exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.id;

    const result = await createOrUpdateRating(userId, storeId, rating);

    res.status(result.isUpdated ? 200 : 201).json({
      message: result.isUpdated ? formatMessage(responseMessages.success.Updated, { key: 'Rating' }) : formatMessage(responseMessages.success.Created, { key: 'Rating' }),
      data: result.rating
    });
  } catch (error) {
    res.status(500).json({ message: formatMessage(responseMessages.error.InternalServerError), error: error.message });
  }
};
