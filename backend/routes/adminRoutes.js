const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const canPerform = require('../middlewares/canPerform');
const { getDashboardStats } = require('../controllers/adminController');

router.get('/dashboard/', verifyToken, canPerform('viewDashboard'), getDashboardStats);

module.exports = router;