const registration = require("../models/registrationModel");
const bcrypt = require("bcryptjs");
module.exports = {
  userRegistration: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 8);
      registration.create(userData, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  },

  userLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      const user = await registration.findOne({ email: userData.email });
      if (user) {
        const status = bcrypt.compare(userData.password, user.password);
        if (status) {
          const token = await user.generateAuthToken(user._id);
          resolve({status:true,access_token:token});
        } else {
          resolve({status:false});
        }
      } else {
        resolve({status:false});
      }
    });
  },
};
