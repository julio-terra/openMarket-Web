import { createContext, useState, useContext } from 'react';
import { useAlert } from './alert';
import api from '../services/axios';
import validator from 'validator';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const { triggerAlert } = useAlert();
  const [logged, setLogged] = useState(() => {

    const isLogged = localStorage.getItem('@auth:token');

    return !!isLogged;
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('@auth:user')));
  const [loading, setLoading] = useState(false);
  const signIn = async (email, password) => {
    setLoading(true)
    if(!email || !password){
      triggerAlert('please fill in all fields')
      setLoading(false)
    }else{
      const response = await api.post('/user/login', {email, password});
      if(response.data.error){
        triggerAlert(response.data.message)
        setLoading(false)
      }else{
        localStorage.setItem('@auth:user', JSON.stringify(response.data.user));
        localStorage.setItem('@auth:token', response.data.accessToken);
        setUser(response.data.user)
        setLogged(true);
        setLoading(false);
      }
    }
  }
  const signUp = async (name, email, password) => {
    setLoading(true)
    if(!name || !email || !password){
      triggerAlert('please fill in all fields')
      setLoading(false)
    }else{
      const isEmail = validator.isEmail(email);
      if(!isEmail){
        triggerAlert('enter a valid email')
        setLoading(false)
      }else{
        const isStrongPassword = validator.isStrongPassword(password, {minLowercase: 0, minUppercase: 0, minSymbols: 0})
        if(!isStrongPassword){
          triggerAlert('your password is too weak')
          setLoading(false)
        }else{
          const response = await api.post('/user/register', {name, email, password})
          if(response.data.error){
            triggerAlert(response.data.message)
            setLoading(false)
          }else{
            signIn(email, password, setLoading)
            triggerAlert('account created successfully')
            setLoading(false)
          }
        }
      }
    }
  }

  const signOut = () => {
    localStorage.removeItem('@auth:user');
    localStorage.removeItem('@auth:token');
    setLogged(false);
  }

  return (
    <AuthContext.Provider value={{logged, user, loading, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {AuthProvider, useAuth}