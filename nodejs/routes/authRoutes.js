const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();
// router.get('/signin', authController.login_get);
router.post('/signin', authController.login_post);
router.post('/signup', authController.registration_post);

module.exports = router;