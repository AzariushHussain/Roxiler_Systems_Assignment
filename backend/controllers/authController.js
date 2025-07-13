const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const { responseMessages } = require('../utils/constants');
const formatMessage = require('../utils/messageFormatter');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address ,role} = req.body;

    const existing = await db.User.findAll({ where: { email } });
    if (existing.length) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      name,
      email,
      address,
      password: hashed,
      role: role
    });
    const message = formatMessage(responseMessages.success.Created, { key: 'User' });
    res.status(201).json({
      message: message,
      user: { id: newUser.id, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await db.User.findAll({ where: { email } });
    const user = users[0];

    if (!user){
        const message = formatMessage(responseMessages.error.NotFound, { key: 'User' });
        return res.status(401).json({ message: message });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const message = formatMessage(responseMessages.error.InvalidInput, { key: 'credentials' });
        return res.status(401).json({ message: message });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );
    const message = formatMessage(responseMessages.success.login, { key: 'User' });
    res.status(200).json({
      message: message,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.adminUserCreation = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        const existing = await db.User.findAll({ where: { email } });
        if (existing.length) return res.status(400).json({ message: 'Email already exists' });

        const hashed = await bcrypt.hash(password, 10);

        const newUser = await db.User.create({
            name,
            email,
            address,
            password: hashed,
            role: role
        });
        const message = formatMessage(responseMessages.success.Created, { key: 'User' });
        res.status(201).json({
            message: message,
            user: { id: newUser.id, email: newUser.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const user = await db.User.findByPk(req.id);
    if (!user){
        const message = formatMessage(responseMessages.error.NotFound, { key: 'User' });
        return res.status(404).json({ message: message });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match){
        const message = formatMessage(responseMessages.error.InvalidInput, { key: 'currentPassword' });
        return res.status(401).json({ message: message });
    }

    if (newPassword !== confirmPassword) {
      const message = formatMessage(responseMessages.error.InvalidInput, { key: 'confirmPassword' });
      return res.status(400).json({ message: message });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    const message = formatMessage(responseMessages.success.Updated, { key: 'Password' });
    res.status(200).json({ message: message });
  } catch (error) {
    const message = formatMessage(responseMessages.error.InternalServerError);
    res.status(500).json({ message: message, error: error.message });
  }
};