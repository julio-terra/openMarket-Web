import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/cart';
import { useParams } from 'react-router-dom';

import Slider from '../../components/slider';
import Products from '../../components/product';

import api from '../../services/axios';

import './styles.css';

const Product = () =>{
  const { add } = useCart();
  let params = useParams()
  const [productData, setproductData] = useState();
  const [productsData, setProductsData] = useState();
  const [userData, setUserData] = useState();
  useEffect(() =>{
    const request = async () =>{
      const productResponse = await api.get(`/product/${params.id}`);
      setproductData(productResponse.data?.product);
      const userResponse = await api.get(`/user/${productResponse.data.product.user_id}`);
      setUserData(userResponse.data?.user);
    }
    request();
  },[params])
  useEffect(() =>{
    const request = async () =>{
      var response  = await api.get('/products')
      setProductsData(response.data.products)
    }
    request()
  }, [])
  return(
    <div className="bg-secondary product-page-container">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row">    
          <div className="col-12 col-lg-7 bg-white rounded product-page-img">
            <img
            src={productData?.fileUrl}
            alt="..."
            />
          </div>
          <div className="col-12 col-lg-5 px-0 px-lg-3 mt-3 mt-lg-0 rounded">
            <div className="text-dark product-page-box bg-white">
              <small>new</small>
              <h3>{productData?.name}</h3>
              <h1 className="mt-3 text-green">{productData?.price?.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}</h1>
              <h5 className="mt-3">shop: {userData?.name}</h5>
              <p className="mt-2">category: {productData?.category}</p>
              <div className="row">
                <div className="col-12 mt-2">
                  <button className="btn btn-dark w-100" onClick={() => add(productData)}>
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 product-page-slide text-dark">
          <h3>{productData?.category}</h3>
          <Slider>
            {
              productsData?.filter(p =>p.category === productData?.category)
              .map(e =>(
                <div className="p-1">
                  <Products product={e}/>
                </div>
              ))
            }
          </Slider>
        </div>
        <div className="col-12 product-page-slide">
          <h3>more of: {userData?.name}</h3>
          <Slider>
            {
              productsData?.filter(p =>p.user_id === userData?._id)
              .map(e =>(
                <div className="p-1">
                  <Products product={e}/>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default Product;