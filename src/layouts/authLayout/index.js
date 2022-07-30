import React from 'react';
import Alert from '../../components/alert';
import './styles.css'

function AuthLayout({children}) {
  return (
    <div className="authLayout container d-flex flex-wrap justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-5">
        {children}
      </div>
      <Alert />
    </div>
  )
}

export default AuthLayout;