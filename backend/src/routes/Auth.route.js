import express from 'express'
const router = express.Router();

import verifyJWT from '../middlewares/VerifyJWT.middleware.js';


import authController from '../controllers/Auth.controller.js';
import userController from '../controllers/User.controller.js';
import refreshTokenController from '../controllers/Refresh.controller.js';


router.post('/register', authController.register);



router.post('/login', authController.login);
router.post('/refresh-token', refreshTokenController.refresh);

router.post('/logout', authController.logout);


router.get('/users', userController.getAllUsers);


export default router;