import React from 'react'

const LogRegButton = ({text , onClick}) => {
    return (
        <>
        <button onClick={onClick} className="LogRegButton">{text}</button>
            
        </>
    )
}

export default LogRegButton
