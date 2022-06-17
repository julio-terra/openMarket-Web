import { createContext, useState, useContext } from 'react';

const AlertContext = createContext({});

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({active: false, message: ''});
  const resetAlert = () =>{
    setAlert({active: false, message: alert.message});
  }
  const triggerAlert = (message) =>{
    resetAlert()
    clearTimeout();
    setAlert({active: true, message});
    setTimeout(() =>{
      resetAlert()
    }, 2000);
  }
  return (
    <AlertContext.Provider value={{alert, triggerAlert}}>
      {children}
    </AlertContext.Provider>
  );
}

function useAlert() {
  const context = useContext(AlertContext);

  return context;
}

export {AlertProvider, useAlert}