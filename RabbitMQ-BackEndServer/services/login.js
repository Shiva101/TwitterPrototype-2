var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Lab2MongoDB";
var md5 = require('md5');		// used for encryption 


exports.handle_request_login = function (msg, callback){
	
	var res = {};
	console.log("In handle_request_login:"+ msg.username);
	var username = msg.username;
	var password = msg.password;
	password = md5(password);  // used for encryption 
	if (username!== '' && password !== ''){
		mongo.connect(mongoURL, function(){
		console.log('line 12Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
		coll.findOne({username: username, password:password}, function(err, user){
			if (user) {
				console.log("Username and password matches");
				res.username = user.username;
				res.password = user.password;
				res.code = "200";
				res.value = "Succes Login";		
			}
			 else {
				console.log("Username and password doesnot matches");
				res.code = "401";
				res.value = "Failed Login";
			}
			callback(err, res);
		}); // end findOne
	});  // end mongo.connect
	}// end if
	
}	// end handle_request


exports.handle_request_signup = function (msg, callback){
	
	var res = {};
	console.log("In  handle_request_signup:"+ msg.username);
	var username = msg.username;
	var password = msg.password;
	password = md5(password);	// used for encryption 
	var firstname = msg.firstname;
	var lastname = msg.lastname;
	var email = msg.email;
	var dob = msg.dob;
	var gender = msg.gender;
	validateEmail(email);
  function validateEmail(email) {
	console.log("Email Validating")
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(email)==false){
		res.code = "400";
		res.value = "Email "+ email  + " is not valid";	
		callback(null, res);	
	}	
	else if (username!== '' && password !== ''){
		mongo.connect(mongoURL, function(err, db){
		console.log('To check user existance . Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
		coll.findOne({username: username}, function(err, user){
			if (user) {
				console.log("user with " + username + " exist");
				res.code = "409";
				res.value = username + " exist";	
				callback(err, res);	
			}
			else {
				console.log('To add new user. Connected to mongo at: ' + mongoURL);
				var coll = mongo.collection('login');
				coll.insert({username: username, password:password, firstname:firstname,
				lastname:lastname, dob:dob, email:email, gender:gender}, function(err, user){
				if (user) {
					console.log('To create mytt collection for this user. Connected to mongo at: ' + mongoURL);
					console.log("user " + user);
					var coll = mongo.collection('mytt');
					coll.insert({username: username, tweetCount:0, tweets:[]}, function(err, user){
					if (user) {
						console.log("Created mytt collection successfully for user " + username);
						console.log("user  " + user);
						console.log('To create myprofile collection for this user. Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('myprofile');
						coll.insert({username: username, followerCount:0, followingCount:0, tweetCount:0, follower:[], following:[]}, function(err, user){
						if (user) {
							console.log("Created myprofile collection successfully for user " + username);
							console.log("user  " + user);
							res.code = "201";
							res.value = "Sucessfully added user details to db";		
						}
						callback(err, res);
						}); // end collection.insert for myprofile
					}
					}); // end collection.insert for mytt
				}
				}); // end collection.insert
			}  // end else to add new user
		}); // end findOne
	});  // end mongo.connect
	}// end elseif
	}// end validateEmail
}	// end handle_request


exports.handle_request_old = function (msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	if(msg.username == "test" && msg.password =="test"){
		res.code = "200";
		res.value = "Succes Login";
		
	}
	else{
		res.code = "401";
		res.value = "Failed Login";
	}
	callback(null, res);
}
