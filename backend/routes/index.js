const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const storeRoutes = require('./storeRoutes');
const userRoutes = require('./userRoutes');
const ratingRoutes = require('./ratingRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/stores', storeRoutes);
router.use('/users', userRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;