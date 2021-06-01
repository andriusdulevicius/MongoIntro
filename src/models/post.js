const mongoose = require('mongoose');
const { stringify } = require('querystring');

const Schema = mongoose.Schema;

//reikia apibrezti kokio tipo duomenys bus saugomi DB
// {title:string,
// body:string,
// }

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//eksportuoti naujai sukurta objekta pagal sia schema
// dazniausiai turetu buti post vienaskaitai , jei kolekcijos pavadinimas posts
const Post = mongoose.model('post', postSchema);
//sukurem post modeli pagal postSchema

module.exports = Post;
