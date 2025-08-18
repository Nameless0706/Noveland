const express = require('express');
const router = express.Router();

const userController = require('../controllers/User.controller.js');
const verifyJWT = require('../middlewares/VerifyJWT.middleware.js');

router.get('/all', verifyJWT, userController.getAllUsers); // /user/

module.exports = router;