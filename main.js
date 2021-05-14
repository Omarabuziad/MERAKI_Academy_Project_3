const express = require("express");
const app = express();
const port = 5000 ;
const {uuid} = require("uuidv4")

// a middleware that enables us to read the received JSON data
app.use(express.json());


const articles = [
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
];


// Tickt one : getAllArticles

const getAllArticles = (req , res , next )=> {
  res.status(200);
  res.json(articles)
}

app.get("/articles" ,getAllArticles )




// Tickt Two getArticlesByAuthor

const getArticlesByAuthor = (req , res , next )=> {
  const author = req.query.author
  res.status(200);
  // create empty array based on author 
  const authorArt = []
  // loop the articles and check for matched
  articles.forEach( (elem , index)=>{
    if(elem.author == author){
      authorArt.push(elem)
    }})

    // check if there is matched author or no 
    if(authorArt[0]){
      res.json(authorArt)
    } else {
      res.json("no author matched")
    }

}

app.get("/articles/search_1" , getArticlesByAuthor )



// Tickt Three getAnArticleById

const getAnArticleById = (req , res , next )=> {
  const id = req.query.id
  res.status(200);
  const found = articles.find( (elem , index)=>{
    return elem.id == id
  })

  res.json(found)


}



app.get("/articles/search_2" , getAnArticleById )




// Ticket four createNewArticle

const createNewArticle = (req , res , next )=> {
  res.status(201);
  const newArticle = { title : req.body.title , description: req.body.description , author:req.body.author , id : uuid()}

  if(newArticle){
  articles.push(newArticle) }
  else {
    res.json("please insert an Article")
  }

  res.json(newArticle)
}


app.post("/articles" , createNewArticle )


// Ticket five  updateAnArticleById

const updateAnArticleById = (req, res , next ) => {
  const id = req.params.id

  let i 

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
  }


};


app.put("/articles/:id" , updateAnArticleById )


// Ticket six  deleteArticleById

const deleteArticleById = (req, res , next ) => {
  const id = req.params.id

  let i 

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
  }


};


app.delete("/articles/:id", deleteArticleById )




// Ticket seven  deleteArticlesByAuthor

const deleteArticlesByAuthor = (req, res , next ) => {
  const author = req.body.author

  const l = articles.length


  articles.forEach((elem , index ) => {
    if(elem.author == author){
     articles.splice(index , 1 )}
  });


  if(articles.length == l ){
    res.status(404)
    res.json("there is no matched author")
  } else {
    res.status(200);
    res.json({
      "success" : true ,
      "message" : `Success delete all the articles for the author => ${author}`
    })
  }


};


app.delete("/articles", deleteArticlesByAuthor)























app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
