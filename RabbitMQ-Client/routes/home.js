var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.sign_in = function (req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
} // end function sign_in

exports.sign_up = function (req,res) {

	ejs.renderFile('./views/signup.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}  // end function sign_up

exports.after_sign_in = function (req,res)
{
	// check user already exists
	//var getUser="select * from users where emailid='"+req.param("username")+"'";
	var username = req.param("username");
	var password = req.param("password");
	var msg_payload = { "username": username, "password": password };
		
	console.log("In POST Request = UserName:"+ username+ " and Password: " +password);
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				//assigning the session
				req.session.username = username ;
				console.log("session name assigned is " + req.session.username );
				console.log("valid Login " + results.code);	
				res.send({"login":"Success", "username":username});
				
			}
			else {    
				
				console.log("Invalid Login" + results.code);
				res.send({"login":"Fail"});
			}
		}  
	});
}; // end fucntion after_sign_in

exports.after_sign_up = function (req,res)
{
	var username = req.param("username");
	var password = req.param("password");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var email = req.param("email");
	var dob = req.param("dob");
	var gender = req.param("gender");

	var msg_payload = { "username": username, "password": password, "firstname": firstname,
						"lastname": lastname, "email":email, "dob":dob, "gender":gender};
		
	console.log("In POST Request for signup = UserName:"+ username + " Password:" + password +
				"firstname:" + firstname + " lastname:" + lastname + " email:" + email
				+ " dob:"+  dob + " gender:"+ gender );
	
	mq_client.make_request('signup_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 409){
				console.log( results.code + ":" + results.value);
				res.send({"Signup":"user exists, try again with different username", code:409});
			}
			else if (results.code == 201) {    			
				console.log( results.code + ":" + results.value);
				res.send({"Signup":"Success", code:201});
			}
			else if (results.code == 400) {    			
				console.log( results.code + ":" + results.value);
				res.send({"Signup":"Renter Email", code:400});
			}
		}  
	});
}   // end function after_sign_up

exports.success_login = function(req,res){
	ejs.renderFile('./views/success_login.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}	// end function success_login

 exports.fail_login = function (req,res){
	ejs.renderFile('./views/fail_login.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}		// end function fail_login

//Redirects to the homepage
exports.homepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};		// end fucntion homepage

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	console.log("logout session " + req.session.username);
	req.session.destroy();
	res.redirect('/');
};	// end function logout


exports.editprofile = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("editprofile",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};		// end fucntion editprofile



