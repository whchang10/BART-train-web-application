const express = require('express');
const app = express();
const http = require('http');

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM(`<!DOCTYPE html>`);
// global.jQuery = require('jquery');
// var $ = require('jquery')(window)

// require('jquery-countdown');


app.get('/', function (req, res) {
	res.sendFile('/home/ubuntu/315Assignment4/index.html');
})

app.get('/stations', function (req, res) {
	console.log('stations api call ' + '---Return all stations')
	//res.redirect('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y');
	http.get('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y', (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received.
	  resp.on('end', () => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Cache-Control', 'no-cache');
		res.set('Content-Type', 'application/json; charset=utf-8');
		res.set('Pragma', 'no-cache');
		res.status(200).json(data);
	  });

	}).on("error", (err) => {
	  	console.log("Error: " + err.message);
	});
})

app.get('/trip', function (req, res) {
	console.log('Trip api call ' + '---source:' + req.query.source + '---dest:' + req.query.dest);
	url = 'http://api.bart.gov/api/sched.aspx?cmd=depart&orig=' + req.query.source + '&dest=' + req.query.dest + '&date=now&time=now&b=0&a=1&l=1&key=MW9S-E7SL-26DU-VV8V&json=y';
	//res.redirect(url)
	http.get(url, (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received.
	  resp.on('end', () => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Cache-Control', 'no-cache');
		res.set('Content-Type', 'application/json; charset=utf-8');
		res.set('Pragma', 'no-cache');
		res.status(200).json(data);
	  });

	}).on("error", (err) => {
	  	console.log("Error: " + err.message);
	});
})

app.get('/station', function (req, res) {
	console.log('Station api call ' + '---source:' + req.query.source);
	url = 'http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=' + req.query.source + '&key=MW9S-E7SL-26DU-VV8V&json=y';
	//res.redirect(url)
	http.get(url, (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received.
	  resp.on('end', () => {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Cache-Control', 'no-cache');
		res.set('Content-Type', 'application/json; charset=utf-8');
		res.set('Pragma', 'no-cache');
		res.status(200).json(data);
	  });

	}).on("error", (err) => {
	  	console.log("Error: " + err.message);
	});
})

app.listen(3000, () => console.log('Bart app listening on port 3000!'));