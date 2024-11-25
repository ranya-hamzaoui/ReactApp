import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import NavBar from './Navbar'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import '../../styles/globals.css'
import Sidebar from './SideBar'
function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (  
    <>
    {/* <NavBar></NavBar>
    <main>
    <Outlet />
    </main>
    <Footer></Footer> */}
     <div className="dashboard-modern">
      <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
        <Sidebar collapsed={collapsed} />
        <button
          className="toggle-button"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <i className="bi bi-chevron-right"></i> : <i className="bi bi-chevron-left"></i>}
        </button>
      </div>
      <div className={`content ${collapsed ? "expanded" : ""}`}>
      <main>
      <Outlet />
      </main>
      {/* <Footer></Footer> */}
      </div>
    
    </div>
    </> 
  );
}

export default Layout