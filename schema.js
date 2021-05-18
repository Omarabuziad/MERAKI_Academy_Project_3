const mongoose = require("mongoose");

// by initializing a new schema it is possible to create a document that would hold user information
const user = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String },
  age: { type: Number },
  country: { type: String},
  email: { type: String },
  password:{type:String}
});

const articles = new mongoose.Schema({
    title: {type:String},
 description:{type:String},
 author: {type:mongoose.Schema.ObjectId,ref:"User"}
});


//Create and export the mongoose modle 
const User1 = mongoose.model("User", user);
const Article1 = mongoose.model("Article",articles);

module.exports.User = User1;
module.exports.Article = Article1;