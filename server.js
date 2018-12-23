const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
var now = new Date().toString()
var log = `${now} ${req.method} ${req.url}`
fs.appendFile('server.log', log + '\n', (err) => {
  if(err)
  {
    console.log('File cannot be appended');
  }
})
next();
});

// app.use((req, res, next) => {
// res.render('maintenance.hbs',{
//   pageTitle: 'Maintenance Page',
//   welcomeMessage: 'We will be rightback'
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) => {
  return text.toUpperCase();
});

app.get('/',(req, res) => {
// res.send('<h1>Hello Express!<h1>');
res.render('home.hbs',{
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to Home Page'
});
});

app.get('/about', (req, res) => {
res.render('about.hbs', {
  pageTitle: 'About Us here',
})
});

app.get('/bad',(req, res) =>{
  res.send({
    errorMessage: 'Error Page'
  });
});

app.get('/ask', (req, res) => {
  res.send({
    ask1: 'go to google1.com',
    ask2: 'go to google2.com'
  });
});

app.listen(3000, () => {
  console.log('The server is up on port 3000');
});
