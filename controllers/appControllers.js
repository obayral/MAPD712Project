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

  var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String, 
    date_of_birth: String,
    address: String,
    mail_address: String,
    username: String,
    password: String
  }); 
  
  var patientRecordSchema = new mongoose.Schema({
    patient_id: String,
    first_name: String,
    last_name: String,
    pulse: String,
    blood_type: String,
    cholesterol: String,
    BMI: String,
    previous_surgeries: String,
    condition: String
});

var User = mongoose.model('User', userSchema);
var Patient = mongoose.model('Patient', patientSchema);
var PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);

module.exports = function(app){
    app.get('/',function(req,res){
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("login");
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
        console.log("PEOPLE");
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
    
    //patient record
    app.get('/newpatientrecord',function(req,res){
        console.log("NEW PATIENT RECORD PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("newpatientrecord");
    });
    
    app.post('/newpatientrecord',urlencodedParser,function(req,res){
        postRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        console.log(req.body);
        var newPatientRecord = PatientRecord(req.body).save(function(err,data){
            if (err) throw err;
            res.render("addedrecord",{data: req.body});
        })
    });

    // Delete all patients in the system
    app.get('/deletepatients', function (req, res) {
        deleteRequestCounter++;
        console.log('received DELETE request.');
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        // Find every entity within the given collection
        Patient.deleteMany({}, function (error) {
        // Return all of the patients in the system
        res.render("patients");
        console.log('Sending response to DELETE request.');
    })
  })

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


    // Get all patients in the system
    app.get('/records', function (req, res, next) {
        console.log("ALL RECORDS PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        Patient.find({},function(err, data){
            res.render("records", {collection: data});
           
        });
        console.log('received GET request.');
    })

    // Get all patients in the system
    app.get('/recordsInfo', function (req, res, next) {
        console.log("ALL RECORDS PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        PatientRecord.find({},function(err, data){
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
  
    app.get('/login',function(req,res){
        console.log("LOGIN PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("login");
    });
    app.post('/login',urlencodedParser,function(req,res){
        console.log("LOGIN ATTEMPT");
        console.log("USERNAME BUDUR: " + req.query.user_name);
        console.log("PASSWORD BUDUR: " + req.query.password);
        
        postRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        User.findOne({username: req.query.user_name,password:req.query.password }, function (error, data) {
            if (data) {
                // Send the patient if no issues
                res.render("index");
                console.log('Sending response to login request.');
                console.log('OK');
            } else {
                // Send 404 header if the patient doesn't exist
                res.render("error");
                console.log("Error occurred in sending Response.");
            }
        });
    });

    app.get('/register',function(req,res){
        console.log("REGISTRATION PAGE");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("register");
    });
    
    app.post('/register',urlencodedParser,function(req,res){
        postRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        console.log(req.body);
        var newUser = User(req.body).save(function(err,data){
            if (err) throw err;
            res.render("login",{data: req.body});
        })
    });
    app.get('/logout',function(req,res){
        console.log("LOG OUT");
        getRequestCounter++;
        console.log("Processed Request Counter --> GET: " +  getRequestCounter + ", POST: " + postRequestCounter + ", PUT: " + putRequestCounter +", DELETE: " +deleteRequestCounter);
        res.render("login");
    });
}