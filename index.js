// This is the Import section
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// Setting up the Express Server
const app = express();
const port = 8000;
app.use(expressLayouts);

// Setting up EJS as our View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

// This is the Middleware Section
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the express server on port ${port}: ${err}`);
    }
    console.log(`Express Server is running Successfully on port: ${port}`);
});