import React from "react";
import Navbar from '../Navbar/Navbar'
const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar></Navbar>
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout
