// This is the Import section all the imports will be listed here
const express = require('express');

// Setting up the Express Server
const app = express();
const port = 8000;

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the express server on port ${port}: ${err}`);
    }
    console.log(`Express Server is running Successfully on port: ${port}`);
});