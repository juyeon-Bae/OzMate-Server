require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')
const app = express();
const PORT = 5000;

const signupRoutes = require('./routes/signupRoutes')
const loginRoutes = require('./routes/loginRoutes')
const infocardRoutes = require('./routes/infocardRoutes')
const chatbotRoutes = require('./routes/chatbotRoutes')
const exchangeRateRoutes = require('./routes/exchangeRateRoutes')
const bookMarkRoutes = require('./routes/bookMarkRoutes');
const feedBackRoutes = require('./routes/feedBackRoutes')
const randomCardRoutes = require('./routes/randomCardsRoutes')

app.use(cors());
app.use(express.json());

require('./db/connect')

app.use('/images', express.static(path.join(__dirname, 'images')))

//router
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/infocard', infocardRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/exchange-rate', exchangeRateRoutes);
app.use('/bookmark', bookMarkRoutes);
app.use('/feedback', feedBackRoutes);
app.use('/random', randomCardRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server ${PORT}에서 실행중임`)
})