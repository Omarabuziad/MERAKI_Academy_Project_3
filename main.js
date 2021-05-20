const express = require("express");
const db = require("./db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User , Article , Comment} = require("./schema")
require("dotenv").config();
const app = express();
const port = 5000 ;
const {uuid} = require("uuidv4")

// a middleware that enables us to read the received JSON data
app.use(express.json());




/*const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
];*/


// Tickt one : getAllArticles

const getAllArticles = (req , res , next )=> {
  res.status(200);
 Article.find({}).then((result)=>{res.json(result)}).catch((err)=>{res.send(err)})
}

app.get("/articles" ,getAllArticles )




// Tickt Two getArticlesByAuthor using mongoose

const getArticlesByAuthor = async (req , res , next )=> {
  const author = req.query.author
  
  //Article.find({author:authorid}).then((result)=>{res.json(result)}).catch((err)=>{res.send(err)})
  const user = await User.findOne({firstName:author}).then((result)=>{ return result }).catch((err)=>{res.send(err)})
  Article.find({author:user._id}).then((result)=>{res.json(result) ; res.status(200);}).catch((err)=>{res.send(err)})
}

app.get("/articles/search_1" , getArticlesByAuthor )



// Tickt Three getAnArticleById using mongoose

const getAnArticleById = (req , res , next )=> {
  const id = req.query.id
  res.status(200);
  Article.find({_id:id}).populate("author" , "firstName -_id").exec().then((result)=>{res.json(result)}).catch((err)=>{res.send(err)})

  /*const user = await User.findOne({firstName:author}).then((result)=>{ return result }).catch((err)=>{res.send(err)})
  Article.find({author:user._id}).then((result)=>{res.json(result)}).catch((err)=>{res.send(err)})*/


}



app.get("/articles/search_2" , getAnArticleById )




// Ticket four createNewArticle using mongoose

const createNewArticle = (req , res , next )=> {
  res.status(201);

  const {title, description , author} = req.body ;

  const article = new Article ({
    title, 
    description , 
    author ,
  })

  article.save().then((result)=>{res.json(result)}).catch((err)=>{res.send(err)})
}

app.post("/articles" , createNewArticle )


// Ticket five  updateAnArticleById

const updateAnArticleById = (req, res , next ) => {
  const id = req.params.id

  /*const updatedArticle = { title : req.body.title , description: req.body.description , author:req.body.author }

  for (const key in updatedArticle ) {
    if(updatedArticle[key] && updatedArticle[key] != "" && updatedArticle[key] != " " ){

    } else {
      const keyUpdate = Article.find({_id:id}).populate("author" , "firstName -_id").exec().then((result)=>{return result}).catch((err)=>{res.send(err)})
      newArticle[key] = keyUpdate[key]
    }






  }*/

  Article
  .findOneAndUpdate({_id:id} , req.body  , {new:true})
  .then((result1) => {
    res.json(result1)
  })
  .catch((err) => {
    res.json(err);
  });



  /*let i 

  const found = articles.find((elem , index ) => {
    i = index

    return elem.id == id ;
  });


  if (found) {
    res.status(200);

    // create a update article
    const newArticle = { id : id ,  title : req.body.title , description: req.body.description , author:req.body.author }

    // loop over the object and check if there is no updated information and keep it same origin
    for (const key in newArticle ) {
      if(newArticle[key] && newArticle[key] != "" && newArticle[key] != " " ){

      } else {
        newArticle[key] = found[key]
      }
    }

    // update the article
    articles[i] = newArticle
    res.json(newArticle) ;

  } else {
    res.status(404);
    res.json("articles not found");
  }*/


};


app.put("/articles/:id" , updateAnArticleById )


// Ticket six  deleteArticleById using mongoose

const deleteArticleById = (req, res , next ) => {
  const id = req.params.id

  Article
  .deleteOne({_id:id} )
  .then((result1) => {
    res.json({
      "success" : true ,
      "message" : `Success Delete article with id => ${id}`
    })
  })
  .catch((err) => {
    res.json(err);
    res.status(404);
    res.json("article not found");
  });

  /*let i 

  // check for the matched article to delete it 
  const found = articles.find((elem , index ) => {
    i = index

    return elem.id == id ;
  });

  
  if (found) {
    res.status(200);
    articles.splice(i,1)
    res.json({
      "success" : true ,
      "message" : `Success Delete article with id => ${id}`
    })


  } else {
    res.status(404);
    res.json("article not found");
  }*/




};


app.delete("/articles/:id", deleteArticleById )




// Ticket seven  deleteArticlesByAuthor

const deleteArticlesByAuthor = async (req, res , next ) => {
  const author = req.body.author

  const user = await User.findOne({firstName:author}).then((result)=>{ return result }).catch((err)=>{res.send(err)})
  Article.deleteOne({author:user._id}).then((result)=>{res.json({
    "success" : true ,
    "message" : `Success delete all the articles for the author => ${author}`
  }) ; res.status(200);}).catch((err)=>{res.send(err)})

  /*const l = articles.length

   
  articles.forEach((elem , index ) => {
    if(elem.author == author){
     articles.splice(index , 1 )}
  });

  // make case if the author name is invalid 
  if(articles.length == l ){
    res.status(404)
    res.json("there is no matched author")
  } else {
    res.status(200);
    res.json({
      "success" : true ,
      "message" : `Success delete all the articles for the author => ${author}`
    })
  }*/


};


app.delete("/articles", deleteArticlesByAuthor)





//Server Express Level 2 

//Ticket One 


const createNewAuthor = (req , res , next )=> {
  res.status(201);

  const {firstName, lastName , age , country , email ,password } = req.body ;

  const user = new User ({
    firstName ,
   lastName,
   age,
   country,
   email,
   password,
  })

  user.save().then((result)=>{res.json(result)}).catch((err)=>{res.send(err)})

}

app.post("/users" , createNewAuthor )


// generating a new token
const generateToken = (id , country , TOKEN_EXP_Time , SECRET) => {
  // the payload that will be sent to the client-side
  const payload = {
    userId: id ,
    country: country
  };

  const options = {
    expiresIn: TOKEN_EXP_Time,
  };
  return jwt.sign(payload, SECRET, options);
};

const login = async (req , res , next )=> {
  /*const {email , passowrd } = req.body ;*/
  let loginEmail = req.body.email
  const loginPassword = req.body.password
  loginEmail = loginEmail.toLowerCase()
  const authEmail = await User.findOne({ email : loginEmail}).then((result)=>{return result})
  if(authEmail){
    const comarePass = await bcrypt.compare(loginPassword, authEmail.password)
    if(comarePass){
      const SECRET = process.env.SECRET;
      const TOKEN_EXP_Time = process.env.TOKEN_EXP_Time;
      const token = generateToken(authEmail._id  , authEmail.country , TOKEN_EXP_Time , SECRET )
      res.json({token : token})
    } else { 
      res.status(403);
      res.json({
        message : "The password you’ve entered is incorrect",
        status : 403
      })
    } } else {
    res.status(404);
    res.json({
      message : "The email doesn't exist" ,
      status : 404
    })
  }


}
  


  
app.post("/login" , login )





const createNewComment = (req, res , next ) => {
  //id of the article
  const id = req.params.id


  

  const {comment, commenter} = req.body ;

  const comment1 = new Comment ({
    comment, 
    commenter , 
  })

  comment1.save().then((result)=>{res.json(result) ; res.status(201); }).catch((err)=>{res.send(err)})
}


app.post("/articles/:id/comments" , createNewComment )



const deleteuserById = (req, res , next ) => {
  const id = req.params.id

  User
  .deleteOne({_id:id} )
  .then((result1) => {
    res.json({
      "success" : true ,
      "message" : `Success Delete article with id => ${id}`
    })
  })
  .catch((err) => {
    res.json(err);
    res.status(404);
    res.json("article not found");
  });

};


app.delete("/users/:id", deleteuserById )






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
