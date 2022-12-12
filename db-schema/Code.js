//This is the Code schema, it define the Code model in MongoDB (with Mongoose Library)
const mongoose = require('mongoose');


// This is the schema, if you want to add more fields, you can do it here
const codeSchema = new mongoose.Schema({
  brand: String,
  price: String,
  code: String,
  status: String, //Avaliable, Not Avaliable
  image: String
});


//To export the schema, don't touch it.
module.exports = mongoose.model('Code', codeSchema);
