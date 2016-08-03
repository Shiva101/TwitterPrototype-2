var ejs = require("ejs");
var mq_client = require('../rpc/client');


exports.searchpage = function (req, res){
	var q = req.params.q;
	console.log("search q term:"+q);
	res.render("search",{"q":q, sessionUsername:req.session.username});
};



exports.searchTweetInfo = function (req,res)
{
	var q = req.param("q");
	var msg_payload = { "q": q};
		
	console.log("In POST Request =q:"+ q);
	
	mq_client.make_request('searchTweetInfo_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Received searchTweetInfo query result from RabbitMQ server");
				//console.log("tweetCount:" + results.tweetCount);
				//console.log("username:" + results.username);
				//console.log("tweet:" + results.tweets);
				res.send({ tweetObj: results.myObj});
						   //code: results.code});
			}
			else {
			console.log("Invalid Login" + results.code);
				res.send({value:"Search Tweet info Query failed", code:results.code});
			}
		}  
	});
} 		// end function searchTweetInfo