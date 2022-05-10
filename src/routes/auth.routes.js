import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from '../pages/login';
import Register from '../pages/register';

const AuthRoutes = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to="/" />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
};
export default AuthRoutes;