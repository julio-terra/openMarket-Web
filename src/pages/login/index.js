import { useState } from 'react';
import { useAuth } from '../../hooks/auth';

import { Link } from 'react-router-dom'

import './styles.css';

const Login = () =>{
  const [ loading, setLoading ] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn} = useAuth();
  const handleSubmit = event => {
    event.preventDefault();
    signIn(email, password, setLoading)
  }
  return(
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center bg-primary">
      <form onSubmit={handleSubmit}  className="bg-dark login-box animation-in">
        <h2 className="text-white font-weight-bold">Login</h2>
        <small className="text-white">Enter data to enter and buy on openMarket</small>
        <div className="input-group mt-2">
          <div className="input-group-prepend">
            <span className="input-group-text p-0 border-0 bg-primary">
              <span className="mdi mdi-email mx-3" />
              <input
                type="email" 
                className="form form-control form-control-lg" 
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
              />
            </span>
          </div>
        </div>
        <div className="input-group mt-2">
          <div className="input-group-prepend">
            <span className="input-group-text p-0 border-0 bg-primary">
              <span className="mdi mdi-lock mx-3" />
              <input
                type="password" 
                className="form form-control form-control-lg" 
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
              />
            </span>
          </div>
        </div>
        <div className="col-12 mt-2">
        {!loading?
          <button
            className="btn btn-secondary btn-lg w-100"
            type="submit"
          >
            Access
          </button>
          :
          <button className="btn btn-secondary btn-lg w-100">
            <span class="spinner-border spinner-border-sm" />
          </button>
          }
        </div>
        <div className="col-12 d-flex justify-content-end mt-2">
          <Link
            className="btn btn-outline-secondary btn-sm register col-6"
            to="/register" 
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  )
};
export default Login;