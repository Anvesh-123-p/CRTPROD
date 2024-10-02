import React from "react";
import styles from './Lesson_plan.module.css';  
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import imgprofile from '../../../assests/profileimg.svg'; 
const Lesson_plan = () => {
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
                                <a className={`nav-link ${styles.nav_link}`} aria-current="page" href="#">Home</a>
                            </li>
                            <li className={`nav-item ${styles.nav_item}`}>
                                <a className={`nav-link ${styles.nav_link}`} href="#">Classes</a>
                            </li>
                            <li className={`nav-item ${styles.nav_item}`}>
                                <a className={`nav-link ${styles.nav_link}`} href="#">Faculty</a>
                            </li>
                            <li className={`nav-item ${styles.nav_item}`}>
                                <a className={`nav-link ${styles.nav_link}`} href="#" style={{ fontWeight: 'bold' }}>Subjects</a>
                            </li>
                            <li className={`nav-item ${styles.nav_item}`}>
                                <a className={`nav-link ${styles.nav_link}`} href="#">Approval</a>
                            </li>
                        </ul>
                        <div className="dropdown ms-auto">
                            <img src={imgprofile} alt="Profile Image" className={`dropdown-toggle profile-img ${styles.profile_img}`} id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Edit Profile</a></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
                <p className={styles.Bold1}>Subject: Python</p>
                <p className={styles.Bold2}>Class: 2-CSE A</p>
                <p className={styles.Bold3}>Faculty: Anvesh</p>
            </div>
            <table className={`table table-hover ${styles.table}`}>
                <thead>
                    <tr>
                        <th scope="col">Topics Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Target Date</th>
                        <th scope="col">Completion Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Functions</td>
                        <td>2</td>
                        <td>11/09/2024</td>
                        <td>11/09/2024</td>
                        <td style={{ color: 'green' }}>Completed</td>
                    </tr>
                    <tr>
                        <td>Functions</td>
                        <td>2</td>
                        <td>11/09/2024</td>
                        <td>11/09/2024</td>
                        <td style={{ color: 'black' }}>Not Started</td>
                    </tr>
                    <tr>
                        <td>Functions</td>
                        <td>2</td>
                        <td>11/09/2024</td>
                        <td>11/09/2024</td>
                        <td style={{ color: 'red' }}>Pending</td>
                    </tr>
                    <tr>
                        <td>Functions</td>
                        <td>2</td>
                        <td>11/09/2024</td>
                        <td>11/09/2024</td>
                        <td style={{ color: 'orange' }}>Delayed Completion</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.page}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mt-4">
                        <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Lesson_plan;
