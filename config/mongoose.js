const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development_phase');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));
db.once('open', function(){
    console.log('Successfully connected to Database :: MongoDB');
});

module.exports = db;