var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.use('/assets',express.static('assets'));

app.set('view engine', 'ejs');


app.get('/',function(req,res){
    res.render("index");
});

app.get('/contact',function(req,res){
    res.render("contact");
});

app.get('/about',function(req,res){
    res.render("about");
});

app.listen(PORT,function(){
    console.log('Server is listening at ' +  PORT);
});