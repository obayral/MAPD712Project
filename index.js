var express = require('express');
var appController = require('./controllers/appControllers')

var app = express();


var PORT = process.env.PORT || 3000;

app.use('/assets',express.static('assets'));
appController(app);

app.set('view engine', 'ejs');

app.listen(PORT,function(){
    console.log('Server is listening at ' +  PORT);
});

