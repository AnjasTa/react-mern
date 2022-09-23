const { Router } = require('express');
const authController = require('../controllers/authController');
const path = require('../Global/constants')
const router = Router();
const {upload} = require("../helpers/file-helper");
const {singleFileUpload,getallSingleFiles} = require("../controllers/fileController")
router.post(path.routerPath.auth.login, authController.login_post);
router.post(path.routerPath.auth.register, authController.registration_post);
router.post(path.routerPath.auth.user, upload.single('file'), singleFileUpload);
router.get(path.routerPath.auth.userGet, getallSingleFiles);

module.exports = router;