import React from 'react';
import styles from './Faculty_View.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import imgprofile from '../../../assests/profileimg.svg';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BiSearch} from 'react-icons/bi'

import { useState,useEffect } from 'react';
const Faculty_View = () => {
  let navigate=useNavigate()

  const[d,setd]=useState([]);
  const[ch,setch]=useState([]);
  const[Search,setSearch]=useState('')
  const[s,sets]=useState(false)
  const logout=()=>{
    localStorage.clear()
    setTimeout(() => {
        navigate('/login');
        }, 2000);

}
const deletefac=(idd)=>{
  console.log(idd)
  let delurl="http://localhost:8000/api/users/?id="+idd
  axios.delete(delurl).then(
    (response)=>{
        alert(
          response.data.data

        )
        setch(0)

      }
    
    ).catch((err) => alert(JSON.stringify(err.response.data)))


  
}

let url="http://localhost:8000/api/users/?user_type=FAC&dept=";
useEffect(() => {
  const localdata = JSON.parse(localStorage.getItem("token"));
  axios.get(url+localdata.dept).then((response)=>{
    setd(response.data.data)


    }
)
},[ch]);





  return (
    <div>
      {/* First Navbar */}
      <nav className={`navbar navbar-expand-lg ${styles.nav_bar}`  }>
  <div className="container-fluid">
    <button className={`navbar-toggler ${styles.navbar_toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarSupportedContent">
      <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbar_nav}`}>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Home" className={`nav-link ${styles.nav_link}`} aria-current="page">Home</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Class_View" className={`nav-link ${styles.nav_link}`} >Classes</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Faculty_View" className={`nav-link ${styles.nav_link}`} style={{ fontWeight: 'bold' }}>Faculty</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Subject_view" className={`nav-link ${styles.nav_link}`}>Subjects</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Approval" className={`nav-link ${styles.nav_link}`}>Approval</Link>
        </li>
      </ul>
      <div className="dropdown ms-auto">
        <img src={imgprofile} alt="Profile Image" className="dropdown-toggle profile-img" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <Link to="/Hod/Profile"><li><span className="dropdown-item ">Profile</span></li></Link>
          <Link to="/Hod/Edit_Profile"><li><span className="dropdown-item">Edit Profile</span></li></Link>
          <Link to =""><li><span className="dropdown-item" onClick={logout}>Logout</span></li></Link>
        </ul>
      </div>
    </div>
  </div>
</nav>

      {/* Second Navbar */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
        <div className={styles.search}>
        <form class="container d-flex">
           <input class="form-control me-2" type="search" placeholder="Search" 
           onChange={(e)=>{
            setSearch(e.target.value)
            sets(true)
           }} aria-label="Search"/>
           <BiSearch className="fs-1"/>
          </form>
          </div>
        </div>
      </nav>

      {/* Table Section */}
      <div className="container mt-4">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Faculty</th>
              <th>Subjects Handling</th>
              <th>Mobile</th>
              <th>View</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {d.length===0&&
          <div id={styles.loading}><p>Sorry, we dont see any classes created for the department</p></div>}
            
            
            
            
            
            {s ? (d.length>0 &&   d.filter((d)=>{
              if(Search==""){
                return d
              }else if(d.name.toLowerCase().includes(Search.toLowerCase())){
                return d
              }

                }).map((x)=>(

<tr>
<td>{x.name}</td>
<td>Mathematics</td>
<td>{x.mobile_number}</td>
<td>
  <i className="fas fa-eye" style={{ cursor: 'pointer', color: '#007bff' }}></i> {/* Eye Icon */}
</td>
<td>
  {/* <i className="fas fa-pencil-alt" style={{ cursor: 'pointer', color: '#28a745', marginRight: '10px' }}></i> Pencil Icon */}
  <i onClick={() => deletefac(x.id)}className="fas fa-trash-alt" style={{ cursor: 'pointer', color: '#dc3545' }}></i>
  </td>
</tr>

            )
            
          
          )):
          d.map((x)=>(

            <tr>
            <td>{x.name}</td>
            <td>Mathematics</td>
            <td>{x.mobile_number}</td>
            <td>
              <i className="fas fa-eye" style={{ cursor: 'pointer', color: '#007bff' }}></i> {/* Eye Icon */}
            </td>
            <td>
              {/* <i className="fas fa-pencil-alt" style={{ cursor: 'pointer', color: '#28a745', marginRight: '10px' }}></i> Pencil Icon */}
              <i onClick={() => deletefac(x.id)}className="fas fa-trash-alt" style={{ cursor: 'pointer', color: '#dc3545' }}></i>
              </td>
            </tr>
          ))
          
          }
            

          

      
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Faculty_View;
