const dotenv = require('dotenv')
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// importing dotenv file
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;

// connecting to database
require('./DB/conn')

// importing model or userschema
const User = require('./Model/userSchema');

// importing all the routes
app.use(require('./Router/auth'));


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})