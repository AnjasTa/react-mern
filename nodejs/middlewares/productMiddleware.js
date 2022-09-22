const registration = require("../models/registrationModel");
const jwt = require('jsonwebtoken');
const authorizationMessage = require('../Global/constants')
const {jwtKey} = require('../configuration/config')

const prod = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token,jwtKey);
        const user = await registration.findOne({ _id: decoded._id});
        // req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: authorizationMessage.authMessages.unauthorized })
    }
}

module.exports = prod