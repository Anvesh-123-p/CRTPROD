import React from 'react';
import styles from './Class_view.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import imgprofile from '../../../assests/profileimg.svg';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Modal,ModalHeader,ModalBody } from 'reactstrap';
import {BiSearch} from 'react-icons/bi'
import {
  CircularProgress,Pagination
  } from "@mui/material";
const Faculty_Class_View = () => {

  
  const[d,setd]=useState([]);
  const[showForm,setShowForm]=useState(false);
  const[semestername,setsemestername]=useState(false);
    const[sectionname,setsectionname]=useState([])
    const [clsid,setclsid]=useState();
    const[Search,setSearch]=useState('')
    const[s,sets]=useState(false)

  const localdata = JSON.parse(localStorage.getItem("token"));
  
  let classesurl="http://localhost:8000/api/GetClassStudentCount/?dept="+localdata.dept
  
let url='http://localhost:8000/api/class/'


    useEffect(() => {
      const localdata = JSON.parse(localStorage.getItem("token"));
      axios.get(classesurl).then((response)=>{
        setd(response.data)
    
    
        }
    )
    },[]);

    const formopen=()=>{
      setShowForm(true);
      const localdata = JSON.parse(localStorage.getItem("token"));
  }

  const handleSubmit=(e)=>{
    if(localStorage.getItem('token')!=null){
      const localdata = JSON.parse(localStorage.getItem("token"));
      console.log(localdata.id)
      let data={
        "sem":semestername,
        "sec":sectionname,
        "dept":localdata.dept
          

     
 
  
 }

      axios.post(url,data).then(
          (response)=>{
              console.log(response.data)

            }
          
          ).catch((err) => console.log(err))
          
          
      

  }}
  const handleClose=()=>{
      // setShowForm(false);
  }

  
  const secfun=(e)=>{
    setsectionname(e.target.value)
  }
  const semfun=(e)=>{
    setsemestername(e.target.value)
  }
  return (
    <div>
       <Modal size='lg'
             isOpen={showForm}
            
            toggle={()=>setShowForm(true)}>
            <ModalHeader
            toggle={()=>setShowForm(false)}> 
            Add Drive   
            </ModalHeader>
            <ModalBody>
            <form className="form-inline " id="StudentModal" onSubmit={(e) => {
                handleSubmit(e);
            }}>
            {<div class="row g-5 mb-3">
                <div class="col ">
                    <label>Semester</label>
                    <input type="number" className={`form-control ${styles.input}`}  onChange = {(e)=>{semfun(e)}}  placeholder="Company name" aria-label="Company name"/>
                </div>
                <div class="col ">
                    <label>section</label>
                    <input type="text" className={`form-control ${styles.input}`}  onChange = {(e)=>{secfun(e)}}  placeholder="Company name" aria-label="Company name"/>
                </div>
                
                {/* <select id="inputState"onChange={(e)=>{Clsid(e)}}>
                <option defaultValue>Class Name</option>
                {classes.map((x)=>(
                <option value={x.class_id}>{x.dept}_{x.sem}_{x.sec}</option>
                ))}
                </select> */}
              
            
            </div>
            }
           
           
                
            <button className={styles.button} onClick={handleClose} >Submit</button>
       
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        
        </form>  
            </ModalBody>

        </Modal>
      <nav className={`navbar navbar-expand-lg ${styles.nav_bar}`  }>
  <div className="container-fluid">
    <button className={`navbar-toggler ${styles.navbar_toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarSupportedContent">
      <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbar_nav}`}>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Faculty/Home" className={`nav-link ${styles.nav_link}`} aria-current="page">Home</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Faculty/Class_View" className={`nav-link ${styles.nav_link}`} style={{ fontWeight: 'bold' }}>Classes</Link>
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
          <Link to="/Faculty/Profile/"><li><span className="dropdown-item ">Profile</span></li></Link>
          <Link to="/Faculty/Edit_Profile"><li><span className="dropdown-item">Edit Profile</span></li></Link>
          <li><span className="dropdown-item">Logout</span></li>
        </ul>
      </div>
    </div>
  </div>
</nav>

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
            <div className={styles.tablecontainer}>
        <table className={`table table-hover table-bordered ${styles.tablebordered}`}>
          <thead className="table-dark">
            <tr>
              <th>Class Name</th>
              {/* <th>Teacher</th> */}
              <th>Semester</th>
              <th>Section</th>
              <th>Students Count</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Rows */}
            {d.length===0&&
          <div id={styles.loading}><p>Sorry, we dont see any classes created for the department</p></div>}
           
           {s ? (d.length>0 &&   d.filter((d)=>{
              if(Search==""){
                return d
              }else if(d.class_name.toLowerCase().includes(Search.toLowerCase())){
                return d
              }

                }).map((x)=>(
            <tr>
            <td>{x.class_name}</td>
                    {/* <td>Anvesh Reddy</td> */}
                    <td>{x.sem}</td>
                    <td>{x.sec}</td>
                    <td>{x.student_count}</td>

              
            </tr>
            ))):
            (
              d.map((x)=>(
               
                <tr>
                <td>{x.class_name}</td>
                        {/* <td>Anvesh Reddy</td> */}
                        <td>{x.sem}</td>
                        <td>{x.sec}</td>
                        <td>{x.student_count}</td>
    
                 
                </tr>              
                
               
              ))
             )}
            
          </tbody>
        </table>
      </div>

    </div>
    );
};

export default Faculty_Class_View;
