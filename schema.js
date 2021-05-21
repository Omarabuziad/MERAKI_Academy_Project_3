const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// by initializing a new schema it is possible to create a document that would hold user information
const users = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String },
  age: { type: Number },
  country: { type: String},
  email: { type: String },
  password:{type:String} , 
  role:{type:mongoose.Schema.ObjectId,ref:"Role"}
});

users.pre("save", async function () {
  // `this` refers to the newly created user before saving
  const salt = 10 ;
  this.email = await this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password,salt);
  /*this.password = hashedPassword*/
})


const articles = new mongoose.Schema({
    title: {type:String},
 description:{type:String},
 author: {type:mongoose.Schema.ObjectId,ref:"User"},
 comments:[{type:mongoose.Schema.ObjectId , ref :"Comment"}]

});

const comments = new mongoose.Schema({
    comment: {type:String},
    commenter: {type:mongoose.Schema.ObjectId }
});


const roles = new mongoose.Schema({
  role: {type:String} ,
  permissions: [{type:String}]
})


//Create and export the mongoose modle 
const User1 = mongoose.model("User", users);
const Article1 = mongoose.model("Article",articles);
const Comment1 = mongoose.model("Comment", comments);
const Role1 = mongoose.model("Role", roles);

module.exports.User = User1;
module.exports.Article = Article1;
module.exports.Comment = Comment1;
module.exports.Role = Role1;


/*
module.exports.User =  mongoose.model("User", users);
module.exports.Article = mongoose.model("Article",articles);
*/

// middleWare to make email lowercas and make password hash

