import React from 'react'
import './App.css'
import { Outlet } from "react-router-dom";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from "react-toastify";
import Mouse from "./Components/Mouse";

function App() {
  return (
    <main> 
      <Header />
      <Outlet />
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />    
      {/* <Mouse />  */}
    </main> 
  )
}

export default App
