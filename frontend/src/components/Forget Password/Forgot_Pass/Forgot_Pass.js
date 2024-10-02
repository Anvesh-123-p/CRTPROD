import React, { useState } from 'react';
import styles from './Forgot_Pass.module.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forgot_Pass = () => {
    const [email, setEmail] = useState("");
    const newEmail=(e)=>{
        console.log(e)
            console.log(e.target.value)
            setEmail(e.target.value)
    
      }
    const navigate=useNavigate();
    

    const handlepasswordreset=()=>{
    
        let url ="http://127.0.0.1:8000/api/password-reset/?email="+email
    
        axios.get(url).then((response)=>{
          alert("Please check you mail for new passcode, Thanks")
          setTimeout(() => {
            navigate('/login');
            }, 500);
    
        
          
        })
    }
    return (
        <div className={styles.container}>
            <label htmlFor="email" className={styles.label}>Forgot Password</label>
            <input 
                id="email" 
                type="email" 
                className={styles.inputField} 
                placeholder="Enter Email Address" 
                onChange={(e)=>{newEmail(e)}}
                required
            />
            <Link to="/login/"><a href="#" className={styles.backLink}>Back to Sign In</a></Link>
            <button type="submit" className={styles.submitButton} onClick={handlepasswordreset}>Submit</button>

        </div>
    );
};

export default Forgot_Pass;
