const db = require('../models/index');
const Store = db.Store;
const Rating = db.Rating;
const User = db.User;
const { parsePagination, buildPaginatedResponse } = require('../utils/paginate');
const { Sequelize } = require('sequelize');


exports.getAllStoresWithRatings = async (req, res) => {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { name, address } = req.query;

    let whereClause = {};
    
    if (name) {
      whereClause.name = { [Sequelize.Op.iLike]: `%${name}%` };
    }
    
    if (address) {
      whereClause.address = { [Sequelize.Op.iLike]: `%${address}%` };
    }

    if (req.role === 'store_owner') {
      whereClause.owner_id = req.id;
    }

    const stores = await Store.findAll({
      attributes: [
        'id', 'name', 'email', 'address'
      ],
      include: [{ 
        model: Rating,
        attributes: []
      }],
      where: whereClause,
      group: ['Store.id'],
      order: [['name', 'ASC']],
      limit,
      offset,
      raw: true,
      subQuery: false
    });

    const storeIds = stores.map(store => store.id);
    const ratingStats = {};
    
    if (storeIds.length > 0) {
      const ratings = await Rating.findAll({
        attributes: [
          'store_id',
          [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalRatings']
        ],
        where: { store_id: { [Sequelize.Op.in]: storeIds } },
        group: ['store_id'],
        raw: true
      });
      
      ratings.forEach(rating => {
        ratingStats[rating.store_id] = {
          averageRating: parseFloat(rating.averageRating || 0).toFixed(2),
          totalRatings: parseInt(rating.totalRatings || 0)
        };
      });
    }

    let roleSpecificData = {};

    if (req.role === 'user') {
      const userRatings = await Rating.findAll({
        where: { user_id: req.id },
        attributes: ['store_id', 'rating'],
        raw: true
      });
      
      roleSpecificData = userRatings.reduce((acc, rating) => {
        acc[rating.store_id] = rating.rating;
        return acc;
      }, {});
    }

    if (req.role === 'store_owner') {
      const storeIds = stores.map(store => store.id);
      
      if (storeIds.length > 0) {
        try {
          const detailedRatings = await Rating.findAll({
            where: { store_id: { [Sequelize.Op.in]: storeIds } },
            include: [{
              model: User,
              attributes: ['id', 'name', 'email']
            }],
            attributes: ['store_id', 'rating', 'createdAt'],
            order: [['createdAt', 'DESC']]
          });
          
          roleSpecificData = detailedRatings.reduce((acc, rating) => {
            if (!acc[rating.store_id]) acc[rating.store_id] = [];
            acc[rating.store_id].push({
              rating: rating.rating,
              user: rating.User,
              created_at: rating.createdAt
            });
            return acc;
          }, {});
        } catch (error) {
          console.error('Error fetching detailed ratings for store owner:', error);
          roleSpecificData = {};
        }
      }
    }

    const formatted = stores?.map(store => {
      const stats = ratingStats[store.id] || { averageRating: '0.00', totalRatings: 0 };
      const result = {
        ...store,
        averageRating: stats.averageRating,
        totalRatings: stats.totalRatings
      };
      
      if (req.role === 'user') {
        result.userRating = roleSpecificData[store.id] || null;
      }
      
      if (req.role === 'store_owner') {
        result.ratings = roleSpecificData[store.id] || [];
      }
      
      return result;
    });

    const total = await Store.count({ where: whereClause });
    const response = buildPaginatedResponse(formatted, total, page, limit);
    
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Error fetching stores:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch stores',
      message: error.message 
    });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const storeData = {
      name,
      email,
      address
    };

    if (req.role === 'store_owner') {
      storeData.owner_id = req.userId;
    } else if (req.role === 'admin') {
      if (owner_id) {
        storeData.owner_id = owner_id;
      }
      else {
        storeData.owner_id = req.userId;
      }
    }

    const newStore = await Store.create(storeData);

    res.status(201).json({
      message: 'Store created successfully',
      store: newStore
    });
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ message: 'Failed to create store' });
  }
};