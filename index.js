// This is the Import section
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');

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
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the express server on port ${port}: ${err}`);
    }
    console.log(`Express Server is running Successfully on port: ${port}`);
});