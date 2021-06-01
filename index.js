//npm init , express instaliuoti, pasikurti pradini serveri, suisntaliuoti ejs , prisideti kaip view engine, pasikurti views direktorija, prisideti index view kuri sugeneruojam

const express = require('express');
const app = express();

const { mongoDbString } = require('./src/config/config');

//susiinstaliuojam mongoose , npm install mongoose
//isitraukiam mongoose paketa
const mongoose = require('mongoose');
//prisijungiam prie duomenu bazes
mongoose.connect(mongoDbString);

//register view engine
app.set('view engine', 'ejs');
//render views home dir
app.set('views', 'src/views');

app.get('/', function (req, res) {
  // renderinant nereikia rasyti failo galunes kuri nori uzkrauti
  res.render('index', {
    title: 'Home page',
  });
});

//404 case , kai vartotojas ivede psl kurio nera
app.use((req, res) => res.status(404).send('Ops , page not found'));

app.listen(3000);
