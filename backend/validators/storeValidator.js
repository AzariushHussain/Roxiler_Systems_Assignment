const { check } = require('express-validator');

exports.createStoreRules = [
  check('name')
    .notEmpty()
    .withMessage('Store name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Store name must be between 2 and 100 characters')
    .trim(),

  check('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  check('address')
    .optional({ checkFalsy: true })
    .isLength({ max: 400 })
    .withMessage('Address cannot exceed 400 characters')
    .trim(),

  check('owner_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Owner ID must be a valid positive integer')
];

exports.updateStoreRules = [
  check('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Store name must be between 2 and 100 characters')
    .trim(),

  check('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  check('address')
    .optional({ checkFalsy: true })
    .isLength({ max: 400 })
    .withMessage('Address cannot exceed 400 characters')
    .trim()
];

exports.storeFilterRules = [
  check('name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Name filter cannot exceed 100 characters')
    .trim(),

  check('address')
    .optional()
    .isLength({ max: 400 })
    .withMessage('Address filter cannot exceed 400 characters')
    .trim(),

  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  check('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];