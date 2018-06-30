const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//	Middleware function
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}` ;

	console.log(now);

	fs.appendFile('server.log', log + '\n', (error) =>{
		if(error){
			console.log(error);
		}
	});
	next();
});

////////////////////////////////////////////////////////////////////
// app.use((req, res, next) => {
// 	res.render('maintainance.hbs', {
// 		title: 'Maintainance Error'

// 	});
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	// res.send('Hello Express');
	res.render('index.hbs', {
		title: 'HELLO',
		welcome: 'Welcome to our Website'
	});
});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		title: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Cannot connect'
	});
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});