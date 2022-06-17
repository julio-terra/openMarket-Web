import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from '../pages/login';
import Register from '../pages/register';
import AuthLayout from '../layouts/authLayout';

const AuthRoutes = () => {
  return(
    <BrowserRouter>
      <AuthLayout>
        <Routes>
          <Route path='*' element={<Navigate to="/" />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </AuthLayout>
    </BrowserRouter>
  )
};
export default AuthRoutes;