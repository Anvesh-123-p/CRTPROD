import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import styles from './Login.module.css';
import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import {
//   ToggleButtonGroup,
//   ToggleButton,
//   } from "@mui/material";
var hash = require("hash.js");

const Login = () => {
  let url="http://127.0.0.1:8000/api/users/";
  let stat=''

  const [Email,setEmail]=useState('')

  const [name, setName]=useState('')

  const [Password,setPassword]=useState('')

  const [Message,setMessage]=useState('')

  const[type,setType]=useState('')

  const[Toggle,setToggle]=useState('')

 const[auth,setAuth]=useState(false)

  let navigate=useNavigate()


  if (auth) {
    console.log(type)
    if(type==="HOD"){
      console.log("navi")
      setTimeout(() => {
      navigate('/Hod/Home');
      }, 2000);

    }
    else if(type==="FAC"){
      console.log("navi2")
      setTimeout(() => {
        navigate('/Faculty/Home');
      }, 2000);

    }
    // if(type==="FAC"){
    //   setTimeout(() => {
    //   navigate('/Hod/Home');
    //   }, 2000);

    // }
    // else{
    //     setTimeout(() => {
    //     navigate('/Hod/Home');
    //     }, 2000);
  
      
    //}
   
      }
  
  const handleSubmit=(e)=>{
      console.log(e);
      
      axios.get(url).then((response)=>{
         const data = response.data.data.filter((x)=>x.email==Email);
          console.log(Email)
          console.log(data)

          if(data.length!=0){
            stat=data[0].status
            if(stat!='AC'){
              setMessage('Account Still inActive, please contact Department HOD for approval')

            }
            else{
              const actualPassword=data[0].password
              const dept=data[0].dept
              const type=data[0].user_type
              console.log(actualPassword)

              if(actualPassword==Password){
                 setType(type);
                 setAuth(true); 
                 setMessage('Login Successful');
                 const hashValue =
                  hash.sha256().update(password).digest("hex") +
                  hash.sha256().update(name).digest("hex");

      const token = hash.sha256().update(hashValue).digest("hex");

                 const tokenData = {

                  email: Email,
                  password:Password,
                  dept:dept,
                  id: data[0].id,
                  token:token,
                  type:type
                  }; 
                  console.log(tokenData)
                  localStorage.setItem("token",JSON.stringify(tokenData));
              }

            else{
              setMessage('Invalid Password')
            }

        
      }}
      else{
        setMessage('Invalid User')
      }}
      )

          e.preventDefault();
  }

  const emailChange=(e)=>{
      console.log(e)
      console.log(e.target.value)
      setEmail(e.target.value)
  }

  const password=(e)=>{
      console.log(e)
      console.log(e.target.value)
      setPassword(e.target.value)
  }

  // const handleType=(e)=>{
  //   setToggle(e.target.value)
   
  // }

  
    return (
        <div >
      
              <div className={styles.box}> 
                  <div className={styles.image}><img src="https://cdni.iconscout.com/illustration/premium/thumb/man-working-on-his-laptop-on-the-sofa-at-home-2511605-2131717.png" alt=""/></div>
              </div>
              
                  <h1 className={styles.h1}>WELCOME BACK</h1>
                  <h5 className={styles.h5}>Sign in to Continue</h5>  
                  
               
               
               {/* <ToggleButtonGroup
                  color="primary"
                  value={Toggle}
                  exclusive
                  id={styles.toggle}
                  onChange={(e) => {
                  handleType(e);
                  }}
                  >
                  <ToggleButton value="ST" >Student</ToggleButton>
                  <ToggleButton value="TPO">TPO</ToggleButton>
                  <ToggleButton value="TPO">HOD</ToggleButton>
                  </ToggleButtonGroup> */}
                  <p className={`${auth&&styles.green} ${!auth&&styles.red} p`}>{Message}</p>
  
               <form onSubmit={(e) => {
                  handleSubmit(e);
              }}>
                                  <div className="mb-3 {styles.c}">
              <label htmlFor="exampleInputEmail1" id={styles.label}  className="form-label" >Email</label>
              <input type="email" placeholder='Email' value={Email} className="form-control border border-dark" id={styles.exampleInputEmail1}  onChange={(e)=>{emailChange(e)}} aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" id={styles.label} className="form-label">Password</label>
              <input type="password" placeholder='Password' value={Password} className="form-control border border-dark" onChange={(e)=>{password(e)}} id={styles.exampleInputEmail1} required />
            </div>
            <button type="submit"  className={`btn btn-dark ${styles.button}`}>LogIn</button>

             
                <label htmlFor="exampleInputEmail1" id={styles.acc}  className="form-label" ><Link className="form-check-label"   to="/SignUp" htmlFor="exampleCheck1">Don't Have an Account? SignUp</Link></label>
                <Link className="form-check-label" id={styles.acc2}  htmlFor="exampleCheck1" to="/forgot_password/">Forget Password?</Link>
             
                
            </form>
  
      
      
          
  
  
  
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
        </div>
      );
};

export default Login;