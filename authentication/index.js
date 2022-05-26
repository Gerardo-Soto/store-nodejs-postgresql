const jwt = require('jsonwebtoken');

const { config } = require('../config/config');

function sign(data) {
    return jwt.sign(data, config.secret);
}

module.exports = {
    sign,
};