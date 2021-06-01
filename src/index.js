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
    console.log('connected to mongoose');
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

app.get('/posts', (req, res) => {
  //get all posts
  Post.find()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => console.error(err.message));
});

app.get('/single-post', (req, res) => {
  const id = '60b5f5b45b5b41448008dac7';
  Post.findById(id)
    .then((result) => res.render('single', result))
    .catch((err) => console.error(err.message));
});

app.get('/add-post', (req, res) => {
  //sukuriam nauja posta pagal post.js sukurta modeli
  const newPost = new Post({
    title: 'Very nice post',
    author: 'John Doe',
    body: 'blah blah blah this is a long text',
  });
  //kad issaugoti duomenu bazeje naudojam .save() metoda
  newPost
    .save() //issaugom duomenis , kadangi asinchronine funkcija, reikia then
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

//404 case , kai vartotojas ivede psl kurio nera
app.use((req, res) => res.status(404).send('Ops , page not found'));
