const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

const checkRequiredParamInUrl = (req, res, next) => {
  if (!req.query.name) return res.redirect('/');
  next();
};

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/check', (req, res) => {
  const { name, birthdate } = req.body;
  const yearsOld = moment().diff(birthdate, 'years');
  yearsOld >= 18 ? res.redirect(`/major?name=${name}`) : res.redirect(`/minor?name=${name}`);
});

app.get('/major', checkRequiredParamInUrl, (req, res) => {
  const { name } = req.query;
  res.render('major', { name });
});

app.get('/minor', checkRequiredParamInUrl, (req, res) => {
  const { name } = req.query;
  res.render('minor', { name });
});

app.listen(3000);
