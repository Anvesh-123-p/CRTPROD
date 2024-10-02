import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from './Faculty_Profile.module.css';
import Profile from '../../../assests/profileimg.svg';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import imgprofile from '../../../assests/profileimg.svg';

import { useState,useEffect } from "react";
import axios from "axios";
const Faculty_Profile = () => {
    let navigate=useNavigate()

    const logout=()=>{
        localStorage.clear()
        setTimeout(() => {
            navigate('/login');
            }, 2000);

    }
    const [mobile,setmobile]=useState();
    const [profile,setprofile]=useState();


    const [name,setname]=useState();

    const [email,setemail]=useState();

    const [exp,setexp]=useState();
    const [gender,setgen]=useState();

    const [designation,setdesign]=useState("--");

    const [qualification,setquali]=useState("--");
    const [dept,setdept]=useState();
    const [idd,setidd]=useState();


let localdata=""
    if(localStorage.getItem('token')!=null){

      localdata = JSON.parse(localStorage.getItem("token")).email;
  }
  
  
  
      let url="http://localhost:8000/api/users/?email="+localdata
      console.log(url)
    useEffect(() => {
      
      axios.get(url).then((response)=>{
        setname(response.data.data.name)
        setemail(response.data.data.email)
        setmobile(response.data.data.mobile_number)
        setdesign(response.data.data.designation)
        setquali(response.data.data.qualification)
        setdept(response.data.data.dept)
        setexp(response.data.data.experience)
        setgen(response.data.data.gender)
        setidd(response.data.data.id)
        setprofile(response.data.data.profile_photo)


      
        
      })
    },[]);






  return (
    <div>
       <div>
      <nav className={`navbar navbar-expand-lg ${styles.nav_bar}`  }>
  <div className="container-fluid">
    <button className={`navbar-toggler ${styles.navbar_toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarSupportedContent">
      <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbar_nav}`}>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Faculty/home" className={`nav-link ${styles.nav_link}`} aria-current="page">Home</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Faculty/Class_View" className={`nav-link ${styles.nav_link}`}>Classes</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Faculty/Faculty_View" className={`nav-link ${styles.nav_link}`}>Faculty</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Faculty/Subject_view" className={`nav-link ${styles.nav_link}`}>Subjects</Link>
        </li>
        
      </ul>
      <div className="dropdown ms-auto">
        <img src={imgprofile} alt="Profile Image" className="dropdown-toggle profile-img" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
        <Link to="/Faculty/Profile"><li><span className="dropdown-item ">Profile</span></li></Link>
          <Link to="/Faculty/Edit_Profile"><li><span className="dropdown-item">Edit Profile</span></li></Link>
          <Link to =""><li><span className="dropdown-item" onClick={logout}>Logout</span></li></Link>
        </ul>
      </div>
    </div>
  </div>
</nav>

        </div>
   
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4 col-12 mb-3">
                    <div className={`card ${styles.card1}`}>
                        <img src={profile} className="card-img-top" alt="profile" />
                        <div className="card-body">
                            <h5 className="card-title"><strong>{name}</strong></h5>
                            <p className="card-text"><strong>{qualification}</strong></p>
                        </div>
                    </div>
                </div>
                                 
                <div className="col-lg-8 col-12">
                    <div className="table-container">
                        <table className={`table table-bordered ${styles.table_above}`}>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{idd}</td>
                                </tr>
                                <tr>
                                    <th>Email id</th>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{gender}</td>
                                </tr>
                              
                                <tr>
                                    <th>Mobile</th>
                                    <td>{mobile}</td>
                                </tr>
                                <tr>
                                    <th>Classes Handling</th>
                                    <td>2-CSEA, 3-ECE B</td>
                                </tr>
                                <tr>
                                    <th>Subjects Handling</th>
                                    <td>Python, VLSI</td>
                                </tr>
                                <tr>
                                    <th>Department</th>
                                    <td>{dept}</td>
                                </tr>
                                <tr>
                                    <th>Designation</th>
                                    <td>
                                    
                                    {designation &&
                                    <p>{designation}</p>
                                    
                                    }
                                    {!designation &&
                                    <p>--</p>
                                    
                                    }

                                    
                                    
                                    
                                    </td>
                                </tr>
                               
                                <tr>
                                    <th>Qualification</th>
                                    <td>{designation &&
                                    <p>{qualification}</p>
                                    
                                    }
                                    {!qualification &&
                                    <p>--</p>
                                    
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Experience</th>
                                    <td> {designation &&
                                    <p>{exp} years</p>
                                    
                                    }
                                    {!exp &&
                                    <p>--</p>
                                    
                                    }</td>
                                </tr>
                                <tr>
                                    <th>Doctorate</th>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                
                </div>
            </div>
            
            <div className="row">
                <div className="col-12">
                    <table className={`table table-hover ${styles.table_below}`}>
                        <thead>
                            <tr>
                                <th scope="col">Student Name</th>
                                <th scope="col">Total Topics</th>
                                <th scope="col">Not Started Topics</th>
                                <th scope="col" className="text-danger">Pending Topics</th>
                                <th scope="col" className="text-success">Completed Topics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DSA Python</td>
                                <td>100</td>
                                <td>60</td>
                                <td className="text-danger">4</td>
                                <td className="text-success">36</td>
                            </tr>
                            <tr>
                                <td>DSA Python</td>
                                <td>100</td>
                                <td>60</td>
                                <td className="text-danger">4</td>
                                <td className="text-success">36</td>
                            </tr>
                            <tr>
                                <td>DSA Python</td>
                                <td>100</td>
                                <td>60</td>
                                <td className="text-danger">4</td>
                                <td className="text-success">36</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Faculty_Profile;
