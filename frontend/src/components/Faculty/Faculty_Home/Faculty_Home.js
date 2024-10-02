import React from 'react';
import styles from './Faculty_Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgprofile from '../../../assests/profileimg.svg';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState,useEffect } from 'react';
const Faculty_Home = () => {
    let navigate=useNavigate()
    const [tcount,setTcount]=useState(0);
    const [approvaltcount,setapprovaltcount]=useState(0);

    const [phdcount,setphdcount]=useState(0);
    const [nophdcount,setnophdcount]=useState(0);
    const [pendingaccountscount,setpendingaccountscount]=useState(0);
    const [pendinglpcount,setpendinglpcount]=useState(0);
    const[d,setd]=useState([])

    

    let fac_count_url="http://localhost:8000/api/FacultyStatsAPIView/?dept=CSE"
    let approval_stats_url="http://localhost:8000/api/GetApprovalStats/?dept=CSE"
    let classtats="http://localhost:8000/api/GetClassStudentCount/?dept=CSE"
    useEffect(() => {
      
        axios.get(classtats).then((response)=>{
          setd(response.data)
      

          }
    )
      },[]);
    useEffect(() => {
      
        axios.get(fac_count_url).then((response)=>{
          setTcount(response.data.total_faculty)
          setphdcount(response.data.phds)
          setnophdcount(response.data.non_phds)

          }
    )
      },[]);
      useEffect(() => {
      
        axios.get(approval_stats_url).then((response)=>{
          setapprovaltcount(response.data.total)
          if('data.details.new_fac_account.pending' in response &'data.details.new_stu_account.pending' in response){
          setpendingaccountscount(response.data.details.new_fac_account.pending+response.data.details.new_stu_account.pending)}
          if('data.details.new_lessonplan_approval.pending' in response){
          setpendinglpcount(response.data.details.new_lessonplan_approval.pending)
          }
          if('data.phds' in response){
          setphdcount(response.data.phds)}
          if('data.non_phds' in response){
          setnophdcount(response.data.non_phds)}

          }
    )
      },[]);
      const logout=()=>{
        localStorage.clear()
        setTimeout(() => {
            navigate('/login');
            }, 2000);

    }
    return (
        <div>
                  <nav className={`navbar navbar-expand-lg ${styles.nav_bar}`  }>
  <div className="container-fluid">
    <button className={`navbar-toggler ${styles.navbar_toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarSupportedContent">
      <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbar_nav}`}>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Facultyhome" className={`nav-link ${styles.nav_link}`} aria-current="page" style={{ fontWeight: 'bold' }}>Home</Link>
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
          <Link to="/Faculty/profile"><li><span className="dropdown-item ">Profile</span></li></Link>
          <Link to="/Faculty/Edit_Profile"><li><span className="dropdown-item">Edit Profile</span></li></Link>
          <Link to =""><li><span className="dropdown-item" onClick={logout}>Logout</span></li></Link>
        </ul>
      </div>
    </div>
  </div>
</nav>

            <div className={styles.cardcontainer}>
                <div className={styles.card}>
                    <div className={styles.card_body}>
                        <div className={styles.card_content}>
                            <h2 className={styles.card_title}>Faculty</h2>
                            <div className={styles.faculties_container}>
                                <div className={styles.faculty_item}>
                                    <h5>Faculty</h5>
                                    <div className={styles.faculty_value}>{tcount}</div>
                                </div>
                                <div className={styles.faculty_item}>
                                    <h5>Doctorates</h5>
                                    <div className={styles.faculty_value}>{phdcount}</div>
                                </div>
                                <div className={styles.faculty_item}>
                                    <h5>Non Doctorates</h5>
                                    <div className={styles.faculty_value}>{nophdcount}</div>
                                </div>
                            </div>
                            <div className={styles.status_container}>
                                <label>Pending:</label>
                                <p>Some description about the pending status goes here.</p>
                            </div>
                        </div>
                    </div>
                </div>

           

                <div className={styles.card}>
                    <div className={styles.card_body}>
                        <div className={styles.card_content}>
                            <h2 className={styles.card_title}>Classes</h2>
                            <div className={styles.faculties_container}>
                                <div className={styles.faculty_item}>
                                    <h5>Class Name</h5>
                                    {d.map((x)=>(
               
                                    <div className={styles.faculty_value}>{x.class_name}</div>
                                    ))}
                                   
                                </div>
                                <div className={styles.faculty_item}>
                                    <h5>Strength</h5>
                                    {d.map((x)=>(
                                    <div className={styles.faculty_value}>{x.student_count}</div>
                                    ))}
                                </div>
                              
                                <div className={styles.faculty_item}>
                                    <h5>Details</h5>
                                    <a href='#'>View</a>
                                  
                                </div>
                            </div>
                            <div className={styles.status_container}>
                                <label>Pending:</label>
                                <p>Some description about the pending status goes here.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.card_body}>
                        <div className={styles.card_content}>
                            <h2 className={styles.card_title}>Alerts</h2>
                            <div className={styles.faculties_container}>
                                <div className={styles.faculty_item}>
                                    <h5>Faculty</h5>
                                    <div className={styles.faculty_value}>120</div>
                                </div>
                                <div className={styles.faculty_item}>
                                    <h5>Subject</h5>
                                    <div className={styles.faculty_value}>120</div>
                                </div>
                                <div className={styles.faculty_item}>
                                    <h5>Details</h5>
                                    <div className={styles.faculty_value}>120</div>
                                    <div className={styles.faculty_value}>120</div>
                                </div>
                            </div>
                            <div className={styles.status_container}>
                                <label>Pending:</label>
                                <p>Some description about the pending status goes here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faculty_Home;
