import React from 'react';

import Layout from '../Layout';
import "../assets/styles/MainPage.css"

import Moovies from './Moovies';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  
  const navigate = useNavigate()

  return (

    <Layout >
      <div className="main-pageBack">       
      </div>
      <div className='main-page'>
        {!localStorage.getItem("user") 
        ? 
        <>
        <h1 className='welcome'>Welcome to the Moovie House!</h1>
          <div className='main-btns'>
            <button onClick={() => navigate("/login")}  className='main-btn login-btn'>Login</button>
            <button onClick={() => navigate("/register")} className='main-btn reg-btn'>Register</button>
          </div>
        </>
        :
        <>
        <h1 className='welcome d-flex'><span className='text-danger'>{(JSON.parse(localStorage.getItem("user")).username)}</span> , welcome to the Moovie House!</h1>
          
        </>
         }
        
          
      </div>
    </Layout>

  );
}

export default MainPage;
