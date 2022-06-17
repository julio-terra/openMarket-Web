import React from 'react';


const button = ({children, loading, className, type, onClick}) =>{
  if(loading){
    return(
      <button className={className} type="" onClick={() => false}>
        <span className="spinner-border spinner-border-sm" />
      </button>
    )
  }else{
    return(
      <button className={className} type={type} onClick={onClick}>
        {children}
      </button>
    )
  }
}

export default button;