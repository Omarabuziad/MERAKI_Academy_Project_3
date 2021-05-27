import React from 'react'

const RegInput = ({type , placeholder,onChange,name}) => {
    const inputHandler = (e)=>{
        console.log(e.target.value)
        console.log("hi")
        

    }
    return (
        <>
         <input name={name} onChange={onChange} placeholder={placeholder} type={type} id="reginp"></input>
        </>
    )
}

export default RegInput
