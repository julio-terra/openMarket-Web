import React, { useEffect, useState } from 'react';
import { useCart } from '../../hooks/cart';

import PerfectScrollbar from 'react-perfect-scrollbar'
import ProductOncart from '../../components/productOnCart';

import './styles.css';

function Cart() {
  const { items } = useCart();
  const [total, setTotal] = useState(0)
  useEffect(() =>{
    let prices = items.reduce((acc, current) => acc + (current.price * current.quantity), 0).toLocaleString('en-us', { style: 'currency', currency: 'USD' })
    setTotal(prices)
  }, [items])
  return (
    <div className="cart bg-secondary">
      <div className="container">
        <div className="d-flex col-12 justify-content-between">
          <h2 className="text-dark">Cart</h2>
          <div className='d-flex'>
            <h2>Total:</h2>
            <h2 className="ms-1 text-green">{total}</h2>
          </div>
        </div>
        <div className='col-12 d-flex mt-4'>
          <PerfectScrollbar className="col-12 products d-flex flex-wrap">
            {
              items?.map(e =>(
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 px-sm-1 my-1">
                  <ProductOncart 
                    product={e}
                    key={e._id}
                  />
                </div>
              ))
            }
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default Cart;