import { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { Link } from 'react-router-dom'

import Button from '../../components/button';

import './styles.css';

const Register = () =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const { signUp, loading } = useAuth();
  const handleSubmit = event => {
    event.preventDefault();
    signUp(name, email, password)
  }
  return(
    <div className="col-12">
      <h1>Welcome</h1>
      <span>Welcome to openMakert! Please enter your details</span>
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="name" className="mt-4">Username</label>
        <br />
        <div className="input-group mt-1">
          <div className="input-group-prepend w-100">
            <input
              type="name" 
              placeholder="Enter your username"
              id="name"
              required
              name="name"
              className="form form-control form-control w-100 border-0" 
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="email" className="mt-3">Email</label>
        <br />
        <div className="input-group mt-1">
          <div className="input-group-prepend w-100">
            <input
              type="email" 
              placeholder="Enter your email"
              id="email"
              required
              name="email"
              className="form form-control form-control w-100 border-0" 
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="password" className="mt-3">Password</label>
        <br />
        <div className="input-group mt-1">
          <div className="input-group-prepend w-100">
            <span className="input-group-text p-0 border-0 bg-transparent">
              <input
                type={seePassword? "text": "password"}
                placeholder="Enter your password"
                id="password"
                required
                name="password"
                className="form form-control form-control w-100 border-0" 
                onChange={e => setPassword(e.target.value)}
              />
              <span
                className={`mdi mx-3 ${seePassword? "mdi-eye": "mdi-eye-off"}`}
                onClick={() => setSeePassword(!seePassword)}
              />
            </span>
          </div>
        </div>
          <Button className="btn btn-dark w-100 mt-3" type="submit" loading={loading}>
            Sign up
          </Button>
        <p className="mt-2">already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </div>
  )
};
export default Register;