import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/User.model.js';

const authController = {
    register : async(req, res) => {
        const {username, firstname, lastname, date_of_birth, created_at=null, password, email} = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const result = await User.createUser(username, firstname, lastname, date_of_birth, created_at, hashedPassword, email);
        res.status(201).send(result);
    },

    login : async(req, res) => {
        const {username, password} = req.body;

        if (!username || !password)     
            return res.status(400).json({ message: 'Username or password is required'});

        try {

            const user = await User.getUserByUsername(username);
            console.log(user);

            if (!user){
                return res.status(400).json({ message: 'Username does not exist' });
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid){
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            // Create JWTS
            const accessToken = jwt.sign(
                {"username": user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );


            const refreshToken = jwt.sign(
                {"username": user.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )



            req.session.user = {
                user_id: user.user_id,
                username: user.username,
                email: user.email
            };

            console.log('Current session:', req.session);
            console.log('Session ID:', req.session.id);
            console.log('Session user:', req.session.user);

            // Emit password from user object to return to frontend
            // Option 1: Using destructuring
            // const {password: _, ...returnUser} = user;
            
            //Option 2: Set password in user object to undefined to omit it
            user.password = undefined

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,  // not accessible through JS
                //secure: true, // if HTTPS
                //sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.status(200).json({ message: 'Login successful' , userData: user, "accessToken": accessToken});
        }

        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    logout: (req, res) => {
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Logged out' });
    }

}   

export default authController;