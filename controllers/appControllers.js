var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require("mongoose");
var getRequestCounter = 0;
var postRequestCounter = 0;
var putRequestCounter = 0;
var deleteRequestCounter = 0;

var uristring = 'mongodb://hacix:hacix123@ds129454.mlab.com:29454/mapd712';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});
var patientSchema = new mongoose.Schema({
    first_name: String,
    last_name: String, 
    date_of_birth: String,
    address: String,
    mail_address: String,
    date_admitted: String,
    department: String,
    ailment: String
  });
var Patient = mongoose.model('Patient', patientSchema);


module.exports = function(app){
    app.get('/',function(req,res){
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("index");
    });
    app.get('/home',function(req,res){
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("index");
    });
   app.get('/contact',function(req,res){
        console.log("CONTACT PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("contact");
    });
    app.post('/contact',urlencodedParser,function(req,res){
        console.log("CONTACT SUCCESS");
        console.log(req.body);
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("contact-success",{data: req.body});
    });
    app.get('/about',function(req,res){
        console.log("ABOUT PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("about");
    });
    app.get('/people',function(req,res){
        console.log("ABOUT PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("info");
    });

    app.get('/newpatient',function(req,res){
        console.log("NEW PATIENT PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("newpatient");
    });
    
    app.post('/newpatient',urlencodedParser,function(req,res){
        postRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        console.log(req.body);
        var newPatient = Patient(req.body).save(function(err,data){
            if (err) throw err;
            res.render("addedpatient",{data: req.body});
        })
    });

    // Get all patients in the system
    app.get('/patients', function (req, res, next) {
        console.log("ALL PATIENTS PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        Patient.find({},function(err, data){
            res.render("patients", {collection: data});
           
        });
        console.log('received GET request.');
    })

    // Get all patients in the system
    app.get('/patientsInfo', function (req, res, next) {
        console.log("ALL PATIENTS PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        Patient.find({},function(err, data){
            res.send(data)
        });
        console.log('received GET request.');
    })



    app.get('/singlepatient',function(req,res){
        console.log("NEW PATIENT PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("singlepatient");
    });
    app.post('/singlepatientresult',urlencodedParser,function(req,res){
        console.log("SINGLE LOLOLOLO");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("singlepatientresult",{data: req.body});
    });
    
    
    // Get a single patient by its patient id
    app.get('/singlePatientInfo/:last_name', function (req, res, next) {
        getRequestCounter++;
        console.log('received GET request.');
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        // Find a single patient by their surname within save
        Patient.findOne({last_name: req.params.last_name }, function (error, data) {
            res.send(data)
        });
        console.log('received GET request.');
  })
}