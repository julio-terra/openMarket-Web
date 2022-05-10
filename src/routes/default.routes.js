import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from '../pages/home';
import { Navigate } from "react-router-dom";
import Product from "../pages/product";
import Search from '../pages/search';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import Footer from '../components/footer'
import ComingSoon from "../pages/comingSoon";  
  
const DefaultRoutes = () => {
  return(
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/register' element={<Navigate to="/" />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/search" element={<Search />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/profile" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
};
export default DefaultRoutes;