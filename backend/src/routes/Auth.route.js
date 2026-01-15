import express from 'express'
const router = express.Router();

import verifyJWT from '../middlewares/VerifyJWT.middleware.js';


import { login, register, logout, getRefreshToken } from '../controllers/Auth.controller.js';


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.post('/refresh-token', getRefreshToken);


export default router;