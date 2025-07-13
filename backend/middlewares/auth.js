const jwt = require('jsonwebtoken')
const  { responseMessages } = require('../utils/constants');
const  formatMessage  = require('../utils/messageFormatter');

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        const message = formatMessage(responseMessages.error.NotFound, { operation: 'Token' });
        return res.status(401).json({ message});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { iat, exp, id, role } = decoded;
        req.id = id;
        req.role = role;
        next();
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.InvalidInput, {operation: 'Token'})
        console.log('inside error messsage:',message);
        res.status(400).json({ message });
    }
};

module.exports = verifyToken;