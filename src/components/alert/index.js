import React from 'react';

import { useAlert } from '../../hooks/alert';
import './styles.css';

function Alert() {
  const { alert } = useAlert();
  
  return (
    <div className={`text-white custom-alert bg-dark p-3 ${alert.active? 'active': 'desActive'}`}>
      <span>{alert.message}</span>
    </div>
  )
}

export default Alert;