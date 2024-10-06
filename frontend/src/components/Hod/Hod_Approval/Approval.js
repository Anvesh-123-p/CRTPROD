import React from "react";
import styles from './Approval.module.css';  
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import imgprofile from '../../../assests/profileimg.svg'; 
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import styles from './StudentHome.module.css'
import { useState,useEffect } from "react";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import {BiSearch} from 'react-icons/bi'
import { Modal,ModalHeader,ModalBody } from 'reactstrap';
import { useNavigate } from "react-router-dom";


const Approval = () => {
  const[showForm,setShowForm]=useState(false);
  const[showappro,setShowappro]=useState(false);
  const[showreje,setShowreje]=useState(false);
  const[reid,setreid]=useState('0');
    const[load,setload]=useState(false)
    const[de,setde]=useState(false)
    const[Search,setSearch]=useState('')
    const[s,sets]=useState(false)
    const[newdata,setnewdata]=useState([])
    const[newdatakeys,setnewdatakeys]=useState([])
    const[newdatavals,setnewdatavals]=useState([])
    const[vals,setvals]=useState({})
    let navigate=useNavigate()



    const[d,setd]=useState([])


    const localdata="X"
    

    


    useEffect(() => {
      if(localStorage.getItem('token')!=null){
        const localdata = JSON.parse(localStorage.getItem("token")).dept;
        let url="http://localhost:8000/api/approval/?dept="+localdata
        
        

      axios.get(url).then((response)=>{
        setd(response.data.data)

      
        
      })
 } },[load,de]);

    const approhandler=(e)=>{

        console.log(e)
        let url="http://localhost:8000/api/approval/"
        let body={
            "approval_id":reid,
            "status":"approved"
        }
    
        axios.patch(url,body).then((response )=>{
            console.log(response)
            if(response.status==200){
              alert('Updated Succesfully')
      
            }else if(response.status!=200){
              alert('Error')
            }
      
           })
           window.location.reload();
    
        
    }
    const handleClose=()=>{
      setShowForm(false);
  }
  const handleCloseappro=()=>{
    setShowappro(false);
}
const handleClosereje=()=>{
  setShowreje(false);
}
const handleOpenreje=(targ)=>{
  setShowreje(true);
  setreid(targ)
  
  
}
const handleOpenappro=(targ)=>{
  setShowappro(true);
  setreid(targ)
  
  
}

    const rejecthandler=(e)=>{
        console.log(e)
        let url="http://localhost:8000/api/approval/"
        let body={
            "approval_id":reid,
            "status":"rejected"
        }
    
        axios.patch(url,body).then((response )=>{
            console.log(response)
            if(response.status==200){
              alert('Rejected Succesfully')
      
            }else if(response.status!=200){
              alert('Error')
            }
      
           })
           window.location.reload();    
    
        
    }
    const logout=()=>{
        
        setTimeout(() => {
            navigate('/login');
            }, 2000);
            localStorage.clear()

    }
    const formopen=(idd)=>{
      setShowForm(true);
  
      const localdata = JSON.parse(localStorage.getItem("token"));
      let url ="http://127.0.0.1:8000/api/approval/?approval_id="+idd
  
      axios.get(url).then((response)=>{
        setnewdata(response.data.data)
        setnewdatakeys(response.data.new_data_keys)
        setnewdatavals(response.data.new_data_vals)


  
      
        
      })
  }
    return (
        <div>

<Modal size='lg'
             isOpen={showForm}
            
            toggle={()=>setShowForm(true)}>
            <ModalHeader
            toggle={()=>setShowForm(false)}> 
            New Data 
            </ModalHeader>
            <ModalBody>
            
            <div class="row g-5 mb-3">
              {/* <p>{newdata.new_data_keys}</p> */}
              {console.log(newdatakeys)}
            
                

              
              {/* {newdatakeys.map((x)=>(
                <tr><th>
                  {x}: {x}

                </th></tr>
                ))} */}
                {
        Object.keys(vals).map((key, index) => ( 
          <p key={index}> <b>{key}</b> : {vals[key]}</p> 
        ))
      }
                  
              
                
          
                
                
                {/* <select id="inputState"onChange={(e)=>{Clsid(e)}}>
                <option defaultValue>Class Name</option>
                {classes.map((x)=>(
                <option value={x.class_id}>{x.dept}_{x.sem}_{x.sec}</option>
                ))}
                </select> */}
              
            
            </div>
            
           
           
                
            <button className={styles.button} onClick={handleClose} >Close</button>
       
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        
         
            </ModalBody>




        </Modal>

        <Modal size='lg'
        isOpen={showappro}>
                      toggle={()=>setShowappro(true)}
            <ModalHeader
            toggle={()=>setShowappro(false)}> 
            New Data 
            </ModalHeader>
        <ModalBody>
              <p>Are you sure to Approve</p>
              <button className="btn btn-secondary" onClick={handleCloseappro}>Cancel</button>
              <button  className="btn btn-success bcst" onClick={approhandler}>Confirm</button>
            </ModalBody>
        </Modal>
        <Modal size='lg'
             isOpen={showreje}>
                          toggle={()=>setShowreje(true)}
            <ModalHeader
            toggle={()=>setShowreje(false)}> 
            New Data 
            </ModalHeader>
        <ModalBody>
              <p>Are you sure to delete</p>
              <button className="btn btn-secondary"onClick={handleClosereje}>Cancel</button>
              <button className="btn btn-danger" onClick={rejecthandler}>Delete</button>
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
          <Link to="/Hod/home" className={`nav-link ${styles.nav_link}`} aria-current="page">Home</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Class_View" className={`nav-link ${styles.nav_link}`} >Classes</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Faculty_View" className={`nav-link ${styles.nav_link}`}>Faculty</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Subject_view" className={`nav-link ${styles.nav_link}`} >Subjects</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Approval" className={`nav-link ${styles.nav_link}`} style={{ fontWeight: 'bold' }}>Approval</Link>
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
                        {/* <Dropdown>
                        <Dropdown.Toggle  id={styles.dropdownbasic}>
                        <img src={imgprofile} alt="Profile Image" className="dropdown-toggle profile-img" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Link to="/faculty_profile"> <Dropdown.Item href="#/action-1"> Profile</Dropdown.Item></Link>
                        <Link to="/Edit_Faculty"> <Dropdown.Item href="#/action-1">Edit Profile</Dropdown.Item></Link>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                 </Dropdown> */}
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
            <table class={`table table-hover ${styles.table}`}>
                <thead>
                    <tr>
                        <th scope="col">Approval Type</th>
                        <th scope="col">ID</th>
                        <th scope="col">Old Data</th>
                        <th scope="col">New Data</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    
                   

                {d.length===0&&
          <div id={styles.loading}><p>Great, we dont see any approvals in pending status</p></div>}

                   
{s ? (d.length>0 &&   d.filter((d)=>{
  if(Search==""){
    return d
  }else if(d.approval_type.toLowerCase().includes(Search.toLowerCase())){
    return d
  }

    }).map((x)=>(
                        
               
                        <tr>
                        <td scope="col">{x.approval_type}</td>
                        <td scope="col">{x.user_email}</td>
                        <td scope="col">{x.old_data}</td>
                        <td scope="col">
                        <a href="#"className={styles.create_button} id={styles.postbtn} onClick={() => {

setShowForm(true);
  
let url ="http://127.0.0.1:8000/api/approval/?approval_id="+x.approval_id

axios.get(url).then((response)=>{
  console.log(response.data)
  setnewdata(response.data)
  setnewdatakeys(response.data.new_data_keys)
  setvals(response.data.new_data)
  setnewdatavals(response.data.new_data_vals)


  
})
                        }} role="button">View</a></td>

                        <td scope="col">    <a onClick={() => handleOpenappro(x.approval_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16" color="green" >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" /></svg></a>
                       <a onClick={() => handleOpenreje(x.approval_id)}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" color="red">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg></a></td>
                    </tr>             
               
              
             ))):
             d.map((x)=>(
                        
               
              <tr>
              <td scope="col">{x.approval_type}</td>
              <td scope="col">{x.user_email}</td>
              <td scope="col">{x.old_data}</td>
              <td scope="col">
              <a href="#"className={styles.create_button} id={styles.postbtn} onClick={() => {

setShowForm(true);
  
let url ="http://127.0.0.1:8000/api/approval/?approval_id="+x.approval_id

axios.get(url).then((response)=>{
  
  setnewdata(response.data)
  console.log(response.data.data)
  setvals(response.data.new_data)

  setnewdatakeys(response.data.new_data_keys)
  setnewdatavals(response.data.new_data_vals)


  
})
                        }} role="button">View</a></td>              <td scope="col">    <a onClick={() => handleOpenappro(x.approval_id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16" color="green" >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" /></svg></a>
             <a onClick={() => handleOpenreje(x.approval_id)}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" color="red">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg></a></td>
          </tr>  ))
            
            
            }
                    
                    </tbody>
            </table>
       {/* <div className={styles.page}> */}
               {/* </div> <nav aria-label="Page navigation example"> */}
                    {/* <ul class="pagination justify-content-center mt-4">
                        <li class="page-item disabled">
                            <span class="page-link">Previous</span>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>

                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
                </div> */}
            </div>
);
};

export default Approval;