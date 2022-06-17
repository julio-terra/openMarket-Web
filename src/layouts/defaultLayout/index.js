import React from 'react';
import Alert from '../../components/alert';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';

function DefaultLayout({children}) {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
      <Alert />
    </>
  )
};

export default DefaultLayout;