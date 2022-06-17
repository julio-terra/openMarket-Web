import React from 'react';
import './styles.css'

function Loading() {
  return (
    <div className="loading d-flex align-items-center justify-content-center bg-secondary">
      <span className="spinner-border spinner-border-sm" />
    </div>
  )
}

export default Loading;