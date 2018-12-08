var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var PORT = process.env.PORT || 3000;

app.use('/assets',express.static('assets'));

app.set('view engine', 'ejs');


app.get('/',function(req,res){
    res.render("index");
});

app.get('/home',function(req,res){
    res.render("index");
});

app.get('/contact',function(req,res){
    res.render("contact");
});

app.post('/contact',urlencodedParser,function(req,res){
    console.log(req.body);
    res.render("contact-success",{data: req.body});
});

app.get('/about',function(req,res){
    
    res.render("about");
});

app.listen(PORT,function(){
    console.log('Server is listening at ' +  PORT);
});

