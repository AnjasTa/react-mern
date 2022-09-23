const { Router } = require('express');
const authController = require('../controllers/authController');
const path = require('../Global/constants')
const router = Router();
const {upload} = require("../helpers/file-helper");
const {singleFileUpload} = require("../controllers/fileController")
// router.get('/signin', authController.login_get);
router.post(path.routerPath.auth.login, authController.login_post);
router.post(path.routerPath.auth.register, authController.registration_post);
router.post(path.routerPath.auth.user, upload.single('file'), singleFileUpload);

module.exports = router;