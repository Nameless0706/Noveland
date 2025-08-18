require('dotenv').config(); 


const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');



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


const authRoute = require('./src/routes/Auth.route.js');
const userRoute = require('./src/routes/User.route.js')
app.use('/', authRoute);
app.use('/user', userRoute);








app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
