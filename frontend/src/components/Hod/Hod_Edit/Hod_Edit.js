import React from "react";
import styles from './Hod_Edit.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import imgprofile from '../../../assests/profileimg.svg';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";

  
const Hod_Edit = () => {
    let navigate=useNavigate()
    const[prof,setprof]=useState('')




const handleSubmit=(e)=>{
    console.log(e);
    let url="http://localhost:8000/api/users/"

    axios.patch(url,prof).then((response )=>{
        console.log(response)
        if(response.status==200){
            alert('Your Account has been succefully Updated, Navigating to Home Page ');
            setTimeout(() => {
                navigate('/faculty/home/');
                }, 2000);


            
        }else if(response.status!=200){
            alert("error");
        }
  
       })

      
  
    
  
  
    
  
    e.preventDefault();
  }

  const newname=(e)=>{
    console.log(e)
        console.log(e.target.value)
        setprof({...prof,name:e.target.value})
  }

  const newMobileNumber=(e)=>{
    console.log(e)
    console.log(e.target.value)
    setprof({...prof,mobile_number:e.target.value})
  }

  const newPassword=(e)=>{
    console.log(e)
    console.log(e.target.value)
    setprof({...prof,password:e.target.value})}
  const newClgid=(e)=>{
   
    setprof({...prof,clg_name:e.target.value})
  }


  const newDepartment=(e)=>{
    setprof({...prof,dept:e.target.value})

  }
  const newdesign=(e)=>{
    setprof({...prof,designation:e.target.value})
  }
  const newQualification=(e)=>{
    setprof({...prof,qualification:e.target.value})
  }
  const newexperience=(e)=>{
    setprof({...prof,experience:e.target.value})
  }

  const newGender=(e)=>{
    setprof({...prof,gender:e.target.value})
  }















    let profurl="http://127.0.0.1:8000/api/users/"
    useEffect(() => {
      if(localStorage.getItem('token')!=null){
        const localdata = JSON.parse(localStorage.getItem("token"));
        console.log(localdata.id)
        axios.get(profurl,{
            params:{
                "id":localdata.id
            }}).then(
                (response)=>{
                    
                    console.log(response.data.data)
                    setprof(response.data.data)
                }
  
  
            )
  
       
      }
    
    },[]);

    const logout=()=>{
        localStorage.clear()
        setTimeout(() => {
            navigate('/login');
            }, 2000);

    }
    return (
        <div>
            <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
                <div className="container-fluid">
                    <button className={`navbar-toggler ${styles.navbar_toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarSupportedContent">
      <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbar_nav}`}>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/HOD/home" className={`nav-link ${styles.nav_link}`} aria-current="page">Home</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/HOD/Class_View" className={`nav-link ${styles.nav_link}`}>Classes</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/HOD/Faculty_View" className={`nav-link ${styles.nav_link}`}>Faculty</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/HOD/Subject_view" className={`nav-link ${styles.nav_link}`}>Subjects</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Approval" className={`nav-link ${styles.nav_link}`}>Approval</Link>
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
            <div className={`container ${styles.formContainer}`}>
                <form>
                    <div className="row g-3">
                        <h1>Edit Profile</h1>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputName" className={`form-label ${styles.formLabel}`}>Name</label>
                                <input type="text" className={`form-control ${styles.formControl}`} id="exampleInputName" value={prof.name} contenteditable="true" onChange={newname}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputQualification" className={`form-label ${styles.formLabel}`}>Qualification</label>
                                <input type="text" className={`form-control ${styles.formControl}`} id="exampleInputQualification" value={prof.qualification} onChange={newQualification}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputEmail" className={`form-label ${styles.formLabel}`}>Email address</label>
                                <input type="email" className={`form-control ${styles.formControl}`} id="exampleInputEmail" value={prof.email}  readonly="false"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputDepartment" className={`form-label ${styles.formLabel}`}>Department</label>
                                <select id="exampleInputDepartment" className={`form-select ${styles.formControl}`} value={prof.dept} onChange={newDepartment}>
                                
                
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electrical </option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
                <option value="EEE">EEE</option>
                </select>
                             
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputContactNumber" className={`form-label ${styles.formLabel}`}>Contact Number</label>
                                <input type="text" className={`form-control ${styles.formControl}`} id="exampleInputContactNumber" value={prof.mobile_number} onChange={newMobileNumber}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputSpecialization" className={`form-label ${styles.formLabel}`}>Designation</label>
                                <input type="text" className={`form-control ${styles.formControl}`} id="exampleInputSpecialization" value={prof.designation} onChange={newdesign} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputPassword" className={`form-label ${styles.formLabel}`}>Password</label>
                                <input type="password" className={`form-control ${styles.formControl}` } id="exampleInputPassword" value={prof.password} onChange={newPassword}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputCollegeName" className={`form-label ${styles.formLabel}`}>College Name</label>
                                <select id="exampleInputCollegeName" className={`form-select ${styles.formControl}`} value={prof.clg_name} onChange={newClgid}>
                                    
                                    <option value="1">Mother Theresa Instituions</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputCollegeName" className={`form-label ${styles.formLabel}`}>Gender</label>
                                <select id="exampleInputCollegeName" className={`form-select ${styles.formControl}`}value={prof.gender} onChange={newGender}>
                                    <option value="M">Male</option>
                                    <option value="F">FeMale</option>

                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputDesignation" className={`form-label ${styles.formLabel}`}>Experience in months </label>
                                <input type="text" className={`form-control ${styles.formControl}`} id="exampleInputDesignation" value={prof.experience} onChange={newexperience}/>
                            </div>
                        </div>
                        
                        {/* <div className="col-md-6">
                            <div className={`form-row ${styles.formRow}`}>
                                <label htmlFor="exampleInputProfilePhoto" className={`form-label ${styles.formLabel}`}>Profile photo</label>
                                <input type="file" className={`form-control ${styles.formControl}`} id="exampleInputProfilePhoto" accept="image/*" />
                            </div>
                        </div> */}
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" className={`btn btn-outline-secondary ${styles.btnCancel}`}>Cancel</button>
                        <button type="button" className={`btn btn-primary ${styles.btnPrimary}`} onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Hod_Edit;
