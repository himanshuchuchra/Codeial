// This is the Import section
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// Setting up the Express Server
const app = express();
const port = 8000;
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// This is the Middleware Section
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the express server on port ${port}: ${err}`);
    }
    console.log(`Express Server is running Successfully on port: ${port}`);
});