const express = require('express');
const router = express.Router();
const { signup, login, adminUserCreation, updatePassword } = require('../controllers/authController');
const { signupRules, loginRules, updatePasswordRules } = require('../validators/userValidations');
const validate = require('../middlewares/validate');
const verifyToken = require('../middlewares/auth');
const canPerform = require('../middlewares/canPerform');

router.post('/register', signupRules, validate, signup);
router.post('/login', loginRules, validate, login);
router.post('/admin/users', verifyToken, canPerform('addUser'), signupRules, validate, adminUserCreation);
router.put('/user/password', verifyToken, updatePasswordRules, validate, updatePassword);

module.exports = router;