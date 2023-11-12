import React from 'react';
import "../assets/styles/MainPage.css"
const ButtonPagination = ({setPage, className, setLoader, disabled, children}) => {
    return (
        <button disabled={disabled} onClick={() => {
           
            localStorage.setItem("page", JSON.stringify(children))
            setPage(children)}} className= {className}>
            {children}
        </button>
    );
}

export default ButtonPagination;
