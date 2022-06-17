import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Navigate } from "react-router-dom";

import DefaultLayout from "../layouts/defaultLayout";
import Home from '../pages/home';
import Product from "../pages/product";
import Search from '../pages/search';
import ComingSoon from "../pages/comingSoon";  
import Cart from "../pages/cart";
import Profile from '../pages/profile';
  
const DefaultRoutes = () => {
  return(
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="*" element={<ComingSoon />} />
          <Route exact path='/register' element={<Navigate to="/" />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart /> }/>
          <Route exact path="/profile" element={<Profile /> } />
          <Route exact path="/product/search" element={<Search />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  )
};
export default DefaultRoutes;