// This is the Import Section
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const { urlencoded } = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// Setting up the Express Server
const app = express();
const port = 8000;
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// This is the Middleware Section
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the express server on port ${port}: ${err}`);
    }
    console.log(`Express Server is running Successfully on port: ${port}`);
});