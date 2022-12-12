//This is the user schema, it define the user model in MongoDB (with Mongoose Library)
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  date_of_birth: String,
  role: String,
  codes: [{
    brand: String,
    price: String,
    code: String,
    status: String  //Avaliable, Not Avaliable, Reported
  }]
});


//This is the plugin that will be used to simplify creating a username and a passord by Passport package, Don't touch it.
userSchema.plugin(passportLocalMongoose);



//This is to export the schema, don't touch it.
module.exports = mongoose.model('User', userSchema);
