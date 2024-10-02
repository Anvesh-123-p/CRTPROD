import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import styles from './Approval_Account.module.css';


const Approval_New_Account = () => {
  return ( 
    <div className="container">
   
    <a href="#" className={`btn btn-light back-btn ${styles.back_btn}`}>
        <i className="fa fa-arrow-left"></i> 
    </a>

    <h1 className="text-center">Data Of Approval</h1>

    <div className={`table-container ${styles.table_container}`}>
        <table className={`table table-bordered ${styles.table_body}`}>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>Anvash Reddy</td>
                </tr>
                <tr>
                    <th>Roll Number</th>
                    <td>123567</td>
                </tr>
                <tr>
                    <th>ClassName Name</th>
                    <td>Albert Einstein</td>
                </tr>
                <tr>
                    <th>Mobile</th>
                    <td>123567890</td>
                </tr>
                <tr>
                    <th>Email Id</th>
                    <td>anvash124@gmail.com</td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td>Male</td>
                </tr>
                <tr>
                    <th>Graduation Year</th>
                    <td>2023</td>
                </tr>
                <tr>
                    <th>Password</th>
                    <td>*******</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  );
};

export default Approval_New_Account;