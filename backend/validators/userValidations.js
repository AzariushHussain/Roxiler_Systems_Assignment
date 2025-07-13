const { check } = require('express-validator');

exports.signupRules = [
  check('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 20, max: 60 }).withMessage('Name must be between 20 and 60 characters'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
    .withMessage('Password must be 8-16 characters with one uppercase and one special character'),

  check('address')
    .notEmpty().withMessage('Address is required')
    .isLength({ max: 400 }).withMessage('Address must not exceed 400 characters'),

  check('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['user', 'admin', 'store_owner']).withMessage('Invalid role'),

];

exports.loginRules = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    
    check('password')
        .notEmpty().withMessage('Password is required')
    ];


exports.updatePasswordRules = [
  check('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  check('newPassword')
    .notEmpty().withMessage('New password is required')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
    .withMessage('New password must be 8-16 characters with one uppercase and one special character'),
  check('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];
