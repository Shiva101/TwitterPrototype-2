/**
 * New node file
 */
var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('should return the login if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should not return the home page if the url is wrong', function(done){
		http.get('http://localhost:3000/home', function(res) {
			assert.equal(404, res.statusCode);
			done();
		})
	});

	it('should login', function(done) {
		request.post(
			    'http://localhost:3000/signin',
			    { form: { username: 'ss',password:'ss' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });

	it('should logout', function(done) {
		request.post(
			    'http://localhost:3000/logout',
			    { form: { username: 'ss',password:'ss' } },
			    function (error, response, body) {
			    	assert.equal(302, response.statusCode);
			    	done();
			    }
			);
	  });

	it('To get profile information like tweet count follower count following count when homepage is loaded  ', function(done) {
		request.post(
			    'http://localhost:3000/profileInfo',
			    { form: { username: 'ss',password:'ss' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	it('To get all tweet info when homepage is loaded  ', function(done) {
		request.post(
			    'http://localhost:3000/allTweetInfo',
			    { form: { username: 'ss',password:'ss' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });

});