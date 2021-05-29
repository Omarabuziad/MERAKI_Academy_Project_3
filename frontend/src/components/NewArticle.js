import React , {useState} from 'react'
import RegInput from "./RegInput"
import LogRegButton from "./LogRegButton"
const axios = require("axios");

const NewArticle = ({token}) => {

    const Article ={}
    const inputArticle = (e)=>{
        let value =(e.target.value)
        let name = (e.target.name)
        Article[name]=value  
    }

    const hi = {title:"nrgreeeefgrg hi",
    description : "hi all",
    author : "60aea5bcc9a378348cc987cd" }

    const postArticle = async ()=>{
        if(token){
            const res = await axios.post('http://localhost:5000/articles', {title:"nrgreeeefgrg hi",
            description : "hi all",
            

             
            }
            );

            console.log(res)










           /* axios.post('http://localhost:5000/articles', {
                //...data
                title:"nrgreeeefgrg hi",
                description : "hi all",
                author : "60aea5bcc9a378348cc987cd"
              }, {
                headers: {
                  authorization: `Bearer ${token}` 
                }
            }).then((response) => {
                console.log(response);
                
            })*/
        }


        
    }


    return (
        <div className = "newarticle">
         <input  className="reginp" name="title" type="text" placeholder="title here" onChange={inputArticle}/>
         <input className="reginp" style={{height:"100px"}} name="description" type="text"  placeholder="description here" onChange={inputArticle} />
         <LogRegButton onClick={postArticle} text="Create new article" />
        </div>
    )
}

export default NewArticle
