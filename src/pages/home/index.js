import { useState, useEffect } from 'react';
import api from '../../services/axios';

import Slider from '../../components/slider';
import Product from '../../components/product';
import Loading from '../../components/loading';

import './styles.css';

const Home = () =>{
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() =>{
    const products = async () =>{
      setLoading(true)
      const productResponse = await api.get('/products');
      setProductData(productResponse.data.products);
      setLoading(false)
    }
    products();
  }, [])
  if(loading){
    return(
      <Loading />
    )
  }else{
    return(
      <div className="container-fluid bg-secondary text-dark">
        <div className="container home-section">
          <h3>Smartphones</h3>
          <Slider className="mt-5">
            {
            productData?.filter(p => p.category === 'Smartphones')
            .map(e =>(
              <div className="p-1">
                <Product product={e} />
              </div>
            ))
            }
          </Slider>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-primary">
              view more
            </button>
          </div>
        </div>
        <div className="container home-section">
          <h3>Sneakers</h3>
          <Slider className="mt-5">
            {
            productData?.filter(p => p.category === 'Sneakers')
            .map(e =>(
              <div className="p-1">
                <Product product={e} />
              </div>
            ))
            }
          </Slider>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-primary">
              view more
            </button>
          </div>
        </div>
        <div className="container home-section">
          <h3>Shirts</h3>
          <Slider className="mt-5">
            {
            productData?.filter(p => p.category === 'Shirts')
            .map(e =>(
              <div className="p-1">
                <Product product={e} />
              </div>
            ))
            }
          </Slider>
          <div className="d-flex justify-content-end mt-4 pb-5">
            <button className="btn btn-primary">
              view more
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default Home;