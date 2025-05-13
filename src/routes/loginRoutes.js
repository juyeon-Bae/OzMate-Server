const express = require('express');
const loginController = require('../controllers/loginControllers')
const router = express.Router();

//로그인
router.post('/', loginController.loginUser)
module.exports = router;