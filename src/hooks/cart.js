import { createContext, useState, useContext } from 'react';
import { useAlert } from './alert';

const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const { triggerAlert } = useAlert();
  const [items, setItems] = useState([]);

  const add = (product) => {
    let check = items.filter(e => e._id === product._id)
    if(check.length === 0){
      const newCart = items;
      newCart.push({...product, quantity: 1})
      setItems([...newCart])
      triggerAlert('product added successfull')
    }
    if(check.length !== 0){
      check[0].quantity += 1
    }
  }
  const remove = (product) =>{
    if(product.quantity === 1){
      const newCart = items.filter(e => e._id !== product._id);
      setItems([...newCart])
      triggerAlert('product removed successfull')
    }
    if(product.quantity !== 1){
        product.quantity -= 1;
        const newCart = items;
        setItems([...newCart]);
    }
  }
  return (
    <CartContext.Provider value={{items, add, remove}}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  return context;
}

export {CartProvider, useCart}