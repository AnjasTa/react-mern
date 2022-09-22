const { Router } = require('express');
const authController = require('../controllers/authController');
const path = require('../Global/constants')
const router = Router();
// router.get('/signin', authController.login_get);
router.post(path.routerPath.auth.login, authController.login_post);
router.post(path.routerPath.auth.register, authController.registration_post);

module.exports = router;