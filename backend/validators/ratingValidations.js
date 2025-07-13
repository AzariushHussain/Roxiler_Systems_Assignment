const { check } = require('express-validator');

exports.ratingRules = [
  check('storeId')
    .notEmpty().withMessage('Store ID is required')
    .isInt({ min: 1 }).withMessage('Store ID must be a positive integer'),

  check('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];
