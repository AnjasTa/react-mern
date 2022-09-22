const userHelpers = require("../helpers/user-helper");
const authMessages = require("../Global/constants");

module.exports.login_post = (req, res) => {
  userHelpers.userLogin(req.body).then((data) => {
    if (data.status == true) {
      res.send({
        results: req.body,
        status: true,
        message: authMessages.authMessages.login.success,
        access_token: data.access_token,
      });
    } else {
      res.send({
        message: authMessages.authMessages.login.error,
        status: false,
      });
    }
  });
};

module.exports.registration_post = (req, res) => {
  userHelpers.userRegistration(req.body).then(
    (data) => {
      res.json({
        results: data,
        message: authMessages.authMessages.register.success,
      });
    },
    (err) => {
      res.json(err);
    }
  );
};
