import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/cart';

const ProductOnCart = ({product}) =>{
  const { remove } = useCart();
  return(
    <Link to={`/product/${product._id}`} className="product bg-white text-dark">
      <img
        className="bg-white"
        src={product.fileUrl}
        alt="..." 
      />
      <h5 onClick={() => window.scrollTo(0,0)}>{product.name}</h5>
      <Link to="/cart">
        <text className='col-2 text-dark d-flex align-items-center'>
          <strong>{product.quantity}</strong>
        </text>
        <button className="btn btn-danger col-10" onClick={() => remove(product)}>
          Remove
        </button>
      </Link>
    </Link>
  )
};

export default ProductOnCart;