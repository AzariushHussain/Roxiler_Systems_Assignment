const policies = require('../utils/policy');
const formatMessage = require('../utils/messageFormatter');
const { responseMessages } = require('../utils/constants');

function canPerform(action) {
  return (req, res, next) => {
    const role = req.role;
    const rolePermissions = policies[role];

    if (!rolePermissions || !rolePermissions.can.includes(action)) {
        const message = formatMessage(responseMessages.error.Forbidden, { key: action });
        return res.status(403).json({ message: message });
    }
    next();
  };
}

module.exports = canPerform;