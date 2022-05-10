import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import './styles.css';

const Sidebar = () =>{
  const [opened, setOpened]= useState('desActive');
  useEffect(() =>{
    window.addEventListener('openCart', () =>{
      setOpened('opened')
    })
  },[])
  const { signOut } = useAuth();
  return(
    <div className={opened === 'desActive'? "null": opened ==='opened'? "sidebar opened px-3 px-sm-5" : "closed sidebar px-3 px-sm-5"}>
      <div
        className="col-12 d-flex justify-content-end pt-3"
        onClick={() =>setOpened('closed')}
      >
        <span className="mdi mdi-close text-white"/>
      </div>
      <div className="col-12 sidebarnav d-flex flex-column align-items-center">
        <li onClick={() =>setOpened('closed')}>
          <Link 
            className="text-white"
            to="/"
          >
            Home
          </Link>
        </li>
        <li onClick={() =>setOpened('closed')}>
          <Link
            className="text-white"
            to="/profile"
          >
            Profile
          </Link>
        </li>
        <li onClick={() =>setOpened('closed')}>
          <Link 
            className="text-white"
            to="/product/search"
          >
            Search
          </Link>
        </li>
        <li onClick={() =>setOpened('closed')}>
          <Link 
            className="text-white"
            to="/card"
          >
            Card
          </Link>
        </li>
        <li onClick={() =>setOpened('closed')}>
          <Link 
            className="text-white"
            onClick={() => signOut()}
            to="/"
          >
            Logout
          </Link>
        </li>
      </div>
    </div>
  )
};
export default Sidebar;