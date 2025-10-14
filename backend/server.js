import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import connectDB from './src/config/Database.config.js';

import authRoute from './src/routes/Auth.route.js';
import userRoute from './src/routes/User.route.js';


const app = express();
const port = 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if using HTTPS
}));



app.use('/', authRoute);
app.use('/user', userRoute);

connectDB();








app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
