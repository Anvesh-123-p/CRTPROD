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
const Class_View = () => {

  const[showreje,setShowreje]=useState(false);
  const[reid,setreid]=useState('0');

  const[d,setd]=useState([]);
  const[showForm,setShowForm]=useState(false);
  const[semestername,setsemestername]=useState(false);
    const[sectionname,setsectionname]=useState([])
    const [clsid,setclsid]=useState();
    const[Search,setSearch]=useState('')
    const[s,sets]=useState(false)
    const[ch,setch]=useState(1)

  const localdata = JSON.parse(localStorage.getItem("token"));
  
  let classesurl="http://localhost:8000/api/GetClassStudentCount/?dept="+localdata.dept
  
let url='http://localhost:8000/api/class/'


    useEffect(() => {
      const localdata = JSON.parse(localStorage.getItem("token"));
      axios.get(classesurl).then((response)=>{
        setd(response.data)
    
    
        }
    )
    },[ch]);

    const formopen=()=>{
      setShowForm(true);
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
          
          ).catch((err) => alert(JSON.stringify(err.response.data)))
          
          
      

  }}
  const handleClose=()=>{
      setShowForm(false);
  }

  
  const secfun=(e)=>{
    setsectionname(e.target.value)
  }
  const semfun=(e)=>{
    setsemestername(e.target.value)
  }
  const deleteclass=()=>{
    let delurl=url+"?class_id="+reid
    axios.delete(delurl).then(
      (response)=>{
          alert(
            response.data.data

          )
          setch(0)

        }
      
      ).catch((err) => alert(JSON.stringify(err.response.data)))

  
    
  }
  const handleClosereje=()=>{
    setShowreje(false);
  }
  const handleOpenreje=(targ)=>{
    setShowreje(true);
    setreid(targ)
    
    
  }
  return (
    <div>
              <Modal size='lg'
             isOpen={showreje}>
                          toggle={()=>setShowreje(true)}
            <ModalHeader
            toggle={()=>setShowreje(false)}> 
             Class Data 
            </ModalHeader>
        <ModalBody>
              <p>Are you sure to delete</p>
              <button className="btn btn-secondary"onClick={handleClosereje}>Cancel</button>
              <button className="btn btn-danger" onClick={deleteclass}>Delete</button>
            </ModalBody>
        </Modal>
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
                    <input type="number" className={`form-control ${styles.input}`}  onChange = {(e)=>{semfun(e)}}  placeholder="Semester" aria-label="Semester"/>
                </div>
                <div class="col ">
                    <label>section</label>
                    <input type="text" className={`form-control ${styles.input}`}  onChange = {(e)=>{secfun(e)}}  placeholder="Section" aria-label="Section"/>
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
          <Link to="/Hod/Home" className={`nav-link ${styles.nav_link}`} aria-current="page">Home</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Class_View" className={`nav-link ${styles.nav_link}`} style={{ fontWeight: 'bold' }}>Classes</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Faculty_View" className={`nav-link ${styles.nav_link}`}>Faculty</Link>
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
          <Link to="/Hod/Profile/"><li><span className="dropdown-item ">Profile</span></li></Link>
          <Link to="/Hod/Edit_Profile"><li><span className="dropdown-item">Edit Profile</span></li></Link>
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
                    <button className={styles.create_button} id={styles.postbtn} onClick={formopen} role="button">Create Class</button>
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
              <th>Action</th>
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

              {/* <i className="fas fa-pencil-alt" style={{ cursor: 'pointer', color: '#28a745', marginRight: '10px' }}></i> Pencil Icon */}
              <i onClick={() => handleOpenreje(x.class_id)}className="fas fa-trash-alt" style={{ cursor: 'pointer', color: '#dc3545' }}></i>
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
    
                  {/* <i className="fas fa-pencil-alt" style={{ cursor: 'pointer', color: '#28a745', marginRight: '10px' }}></i> Pencil Icon */}
                    <i onClick={() => handleOpenreje(x.class_id)}className="fas fa-trash-alt" style={{ cursor: 'pointer', color: '#dc3545' }}></i>
                </tr>              
                
               
              ))
             )}
            
          </tbody>
        </table>
      </div>

    </div>
    );
};

export default Class_View;
