import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../Layout';
import "../assets/styles/Register.css"
import { Alert, Button, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()
    const [valueU, setValueU] = useState("")
    const [valueP, setValueP] = useState("")
    const [validError, setValidError] = useState(false)
    const [success, setSuccess] = useState(false)

  

    const createUser = (username, password) => {
        setSuccess(false)
        username = username.trim()
        password = password.trim()

        let users = JSON.parse(localStorage.getItem("users"))

        if (!username.length || !password.length) {
        setValidError("Username or Password can't be empty!")
        
        }

        else if (password.length < 5) {
            setValidError("Password must be longer than 4!")
            
        }
        
        
        else if (users && users.find(user => user.username == username)) {
        setValidError("The user is already registered!")
       
        }

        else if (users) {
            users = [...users, {username, password}]
            localStorage.setItem("users", JSON.stringify(users))
            localStorage.setItem("user", JSON.stringify({username, password}))
            setValueU("")
            setValueP("")
            setValidError("")
            setSuccess(true)
            navigate("/")
            window.location.reload()
        }

        else {
            
            localStorage.setItem("users", JSON.stringify([{username, password}]))
            localStorage.setItem("user", JSON.stringify({username, password}))
            setValueU("")
            setValueP("")
            setValidError("")
            setSuccess(true)
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
                        <input id="username" maxLength='30' type="text" value={valueU} onChange={(e) => setValueU(e.target.value)} className='inp' placeholder='Username' />
                   </div>
                   <div  style={{marginLeft:"110px"}}>
                    <label htmlFor="pass"  className='label'>Password:</label>
                        <input value={valueP} onChange={(e) => setValueP(e.target.value)} minLength="5" id="pass" maxLength='30' type='password' className='inp' placeholder='Password' />
                   </div>

                   <button  onClick={() => createUser(valueU, valueP)} className='reg-btn'>Register</button>
                    

                   {validError && <Alert severity="error">{validError}</Alert>}  
                   {success && <Alert severity="success">Succesfully created!</Alert>} 
                </div>
            </div>
        </Layout>
        
    );
}

export default Register;
