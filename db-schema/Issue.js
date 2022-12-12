//This is the Code schema, it define the Code model in MongoDB (with Mongoose Library)
const mongoose = require('mongoose');


// This is the schema, if you want to add more fields, you can do it here
const issueSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String, //open,  colsed
    username: String, // The email of the user who reported the issue
    code: {
        brand: String,
        price: String,
        code: String,
        status: String, //Avaliable, Not Avaliable
        image: String
    },
});


//To export the schema, don't touch it.
module.exports = mongoose.model('Issue', issueSchema);
