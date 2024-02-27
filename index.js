var express = require('express');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('dotenv').config();

var KMA_router = require('./routes/Post.router');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb://127.0.0.1:27017/local`,
            {
                // useNewUrlParser: true,
                useUnifiedTopology: true
                // useCreateIndex: true,
            }
        );
        console.log('DB Connected...');
    } catch (e) {
        console.log(e);
    }
};

connectDB();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', KMA_router);

app.listen(process.env.PORT, () => {
    console.log(`Sever Connected with port: ${process.env.PORT}`);
});

module.exports = app;
