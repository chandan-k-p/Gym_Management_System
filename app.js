const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth');

const app = express();

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout'),
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));
app.use(authRoute);
app.get('/trainer', require('./routes/fetch'));

app.get('/user', require('./routes/user'));

module.exports = app;
