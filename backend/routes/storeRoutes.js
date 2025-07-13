const  express = require('express');
const router = express.Router();
const { getAllStoresWithRatings, createStore } = require('../controllers/storeController');
const verifyToken = require('../middlewares/auth');
const canPerform = require('../middlewares/canPerform');
const validate = require('../middlewares/validate');
const { createStoreRules } = require('../validators/storeValidator');

router.get('', verifyToken, canPerform('viewStores'), getAllStoresWithRatings);
router.post('', verifyToken, canPerform('createStore'), createStoreRules, validate, createStore);

module.exports = router;