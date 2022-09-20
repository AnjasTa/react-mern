const registration = require("../models/registrationModel");
const jwt = require('jsonwebtoken');

const prod = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token,'secretkey');
        const user = await registration.findOne({ _id: decoded._id});
        // req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = prod