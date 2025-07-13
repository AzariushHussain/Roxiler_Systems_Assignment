const db = require('../models/index');
const User = db.User;
const Rating = db.Rating
const { parsePagination, buildPaginatedResponse } = require('../utils/paginate');
const { Sequelize } = require('sequelize');

exports.getUsersWithFilters = async (req, res) => {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { name, email, address, role } = req.query;

    const where = {};
    if (name) where.name = { [Sequelize.Op.iLike]: `%${name}%` };
    if (email) where.email = { [Sequelize.Op.iLike]: `%${email}%` };
    if (address) where.address = { [Sequelize.Op.iLike]: `%${address}%` };
    if (role) where.role = role;

    const users = await User.findAll({
      where,
      attributes: ['id', 'name', 'email', 'address', 'role', 'createdAt'],
      order: [['name', 'ASC']],
      limit,
      offset,
      raw: true
    });

    const total = await User.count({ where });

    for (let user of users) {
      if (user.role === 'store_owner') {
        const rating = await Rating.findOne({
          attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avg']],
          where: { user_id: user.id },
          raw: true
        });
        user.averageRating = parseFloat(rating.avg || 0).toFixed(2);
      }
    }

    const result = buildPaginatedResponse(users, total, page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    await user.update({ name, email, role });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating user', 
      error: error.message 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting user', 
      error: error.message 
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'address', 'role', 'createdAt']
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user', 
      error: error.message 
    });
  }
};
