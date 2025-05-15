require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = 5000;

const signupRoutes = require('./routes/signupRoutes')
const loginRoutes = require('./routes/loginRoutes')
const infocardRoutes = require('./routes/infocardRoutes')

app.use(cors());
app.use(express.json());

require('./db/connect')

//router
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/infocard', infocardRoutes)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server ${PORT}에서 실행중임`)
})