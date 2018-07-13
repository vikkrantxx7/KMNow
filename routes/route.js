var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');
var path = require('path');
var session = require('express-session');


var userName;
var firstName;
var lastName;
var errormessage;

exports.names = function(data){
    console.log("data is :");
    console.log(data);
    userName  	= data[0].username;
    firstName 	= data[0].firstname;
    lastName  	= data[0].lastName;

}

router.get('/',function(req,res) {
    console.log("Request for Dashboard Received");
    res.render('index', {title:   'Dashboard'});

});

router.post('/login',function(req,res){
    var username=req.body.username;
    var pass=req.body.pass;
    dbmodule.authenticateUser(username,pass,res);

});

router.get('/register',function(req,res){
    console.log("Request for Register Received");
    res.render('signup',{title:   'Register for Dashboard'});
});

router.get('/srops',(req,res) => {
    console.log("Request for SROPS Received");
    res.render('srops', {title:   'SROPS'});
});

router.get('/srdev',(req,res) => {
    console.log("Request for SRDEV Received");
    res.render('srdev', {title:   'SRDEV'});
});

router.get('/lansa',(req,res) => {
    console.log("Request for LANSA Received");
    res.render('lansa', {title:   'LANSA'});
});

router.get('/mdms',(req,res) => {
    console.log("Request for MDMS Received");
    res.render('mdms', {title:   'MDMS'});
});

router.get('/rds',(req,res) => {
    console.log("Request for RDS Received");
    res.render('rds', {title:   'RDS'});
});

router.post('/save',function(req,res){
    console.log("Request for Save Received");
    var username=req.body.username;
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var pass=req.body.pass;
    console.log(req.body);
    dbmodule.saveUser(username,firstname,lastname,pass,res);

})

module.exports=router;
