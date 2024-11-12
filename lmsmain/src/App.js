import logo from './logo.svg';
import './App.css';
import Master_Layout from './layout/Master_Layout';
import Login_Layout from './layout/Login_Layout';
import { useState,useContext } from 'react';
import { Navigate } from 'react-router-dom';

import Main_arch from './Main_arch';


function App() {

  
  return(
    <>
    {/* <Context> */}
      <Main_arch/>
    {/* </Context> */}
    </>
  )
}

export default App;
