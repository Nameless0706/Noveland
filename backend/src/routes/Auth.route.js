import express from 'express'
const router = express.Router();

import verifyJWT from '../middlewares/VerifyJWT.middleware.js';


import { login, register, logout } from '../controllers/Auth.controller.js';
import {getRefreshToken} from '../controllers/Refresh.controller.js';


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.post('/refresh-token', getRefreshToken);


export default router;