import React from 'react'
import { Link } from 'react-router-dom';

import './styles.css';

const Product = ({product}) =>{
  return(
    <Link to={`/product/${product?._id}`} onClick={() => window.scrollTo(0,0)} className="bg-white product bg-dark text-dark">
      <img
        className="bg-white"
        src={product?.fileUrl}
        alt="..." 
      />
      <h5>{product?.name}</h5>
      <div>
        <strong className="text-green">{product?.price?.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}</strong>
      </div>
    </Link>
  )
};

export default Product;