const express = require('express');
const router = express.Router();

const authController = require('../controllers/Auth.controller.js');
const userController = require('../controllers/User.controller.js');
const refreshTokenController = require('../controllers/Refresh.controller.js');


const verifyJWT = require('../middlewares/VerifyJWT.middleware.js')


router.post('/register', authController.register);



router.post('/login', authController.login);
router.post('/refresh-token', refreshTokenController.refresh);

router.post('/logout', authController.logout);


router.get('/users', userController.getAllUsers);

module.exports = router;
