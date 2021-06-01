//npm init , express instaliuoti, pasikurti pradini serveri, suisntaliuoti ejs , prisideti kaip view engine, pasikurti views direktorija, prisideti index view kuri sugeneruojam

const express = require('express');
const app = express();

const path = require('path');

//register view engine
app.set('view engine', 'ejs');
//render views home dir
app.set('views', 'src/views');

app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
  res.render('index', {
    title: 'Home page',
    page: 'index',
  });
});

//404 case , kai vartotojas ivede psl kurio nera
app.use((req, res) => res.status(404).send('Ops , page not found'));

app.listen(3000);
