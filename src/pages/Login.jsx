
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../Layout';
import "../assets/styles/Register.css"
import { Alert} from '@mui/material';

import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()
    const [valueU, setValueU] = useState("")
    const [valueP, setValueP] = useState("")
    const [validError, setValidError] = useState(false)
    const [success, setSuccess] = useState(false)


    const login = (username, password) => {
        setSuccess(false)
        username = username.trim()
        password = password.trim()

        let users = JSON.parse(localStorage.getItem("users"))

        if (!username.length || !password.length) {
        setValidError("Username or Password can't be empty!")
        
        }     
        let user = null   
        if (users) {
            user = users.find((user) => user.password == password && user.username == username)
        }
        

        if (!user) {
            setValidError("Wrong Username or Password!")
        }

        else {
            localStorage.setItem("user", JSON.stringify({username, password}))
            setValidError(false)
          
            navigate("/")
            window.location.reload()
        }
    }

    return (
        <Layout>
            <div className='register-div'>
                        
                <div className='form-div'>
                
                   <div style={{marginLeft:"110px"}}>
                        <label htmlFor="username" className='label'>Username: </label>
                        <input autoComplete='off' id="username" maxLength='30' type="text" value={valueU} onChange={(e) => setValueU(e.target.value)} className='inp' placeholder='Username' />
                   </div>
                   <div  style={{marginLeft:"110px"}}>
                    <label htmlFor="pass"  className='label'>Password:</label>
                        <input autoComplete='off' autoFocus="off" value={valueP} onChange={(e) => setValueP(e.target.value)} minLength="5" id="pass" maxLength='30' type='password' className='inp' placeholder='Password' />
                   </div>

                   <button  onClick={() => login(valueU, valueP)} className='reg-btn'>Login</button>
                    

                   {validError && <Alert severity="error">{validError}</Alert>}  
                   {success && <Alert severity="success">Succesfully created!</Alert>} 
                </div>
            </div>
        </Layout>
    );
}

export default Login;
