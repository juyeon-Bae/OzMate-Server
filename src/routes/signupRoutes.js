const express = require('express')
const signupController = require('../controllers/signupControllers')
const router = express.Router()

// 회원가입
router.post('/', signupController.signupUser);

module.exports = router;