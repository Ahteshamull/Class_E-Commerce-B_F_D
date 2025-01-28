import React from 'react'
import SubHeader from '../Component/SubHeader'

import Footer from '../Component/Footer'
import { Outlet } from 'react-router'
import { EcommerceNavbar } from './../Component/Navbar';

const Layout = () => {
  return (
    <div>
      <SubHeader />
      <EcommerceNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout