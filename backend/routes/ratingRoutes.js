const express = require('express');
const router = express.Router();
const { submitRating } = require('../controllers/ratingController');
const validate = require('../middlewares/validate');
const { ratingRules } = require('../validators/ratingValidations');
const verifyToken = require('../middlewares/auth');
const canPerform = require('../middlewares/canPerform');

router.post('/submit', verifyToken, canPerform('rateStore'), ratingRules, validate, submitRating);

module.exports = router;