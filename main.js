const express = require("express");
const app = express();
const port = 5000 ;

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
  const id = req.query.id
  res.status(200);
  const found = articles.find( (elem , index)=>{
    return elem.id == id
  })

  res.json(found)


}



app.get("/articles/search_2" , getArticlesByAuthor )
















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






















app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
