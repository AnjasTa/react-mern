const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    db: process.env.DB,
    jwtKey: process.env.JWT_KEY,
    port: process.env.PORT
  };