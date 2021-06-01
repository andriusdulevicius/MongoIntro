//npm init , express instaliuoti, pasikurti pradini serveri, suisntaliuoti ejs , prisideti kaip view engine, pasikurti views direktorija, prisideti index view kuri sugeneruojam

const express = require('express');
const app = express();

const { mongoDbString } = require('./config/config');
const Post = require('./models/post');

//susiinstaliuojam mongoose , npm install mongoose
//isitraukiam mongoose paketa
const mongoose = require('mongoose');
//prisijungiam prie duomenu bazes

mongoose
  .connect(mongoDbString, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => {
    console.log('connected to mongoose, results:');
    app.listen(3000);
  })
  .catch((err) => console.error(err));

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

app.get('/add-post', (req, res) => {
  //sukuriam nauja posta pagal post.js sukurta modeli
  const newPost = new Post({
    title: 'This is Mongoose Db',
    author: 'John Doe',
    body: 'blah blah blah this is a long text',
  });
  //kad issaugoti duomenu bazeje naudojam .save() metoda
  newPost.save();
  res.send('all good');
});

//404 case , kai vartotojas ivede psl kurio nera
app.use((req, res) => res.status(404).send('Ops , page not found'));
