const express = require('express');
const routes = express.Router();
const validate = require('../middlewares/validate');
const verifyToken = require('../middlewares/auth');
const canPerform = require('../middlewares/canPerform');
const { 
  getUsersWithFilters, 
  updateUser, 
  deleteUser, 
  getUserById 
} = require('../controllers/userController');

routes.get('', verifyToken, canPerform('viewAllUsers'), getUsersWithFilters);
routes.get('/:id', verifyToken, canPerform('viewAllUsers'), getUserById);
routes.put('/:id', verifyToken, canPerform('updateUser'), updateUser);
routes.delete('/:id', verifyToken, canPerform('deleteUser'), deleteUser);

module.exports = routes;
