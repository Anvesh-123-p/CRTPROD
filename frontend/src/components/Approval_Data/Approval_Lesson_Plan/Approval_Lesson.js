import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import styles from './Approval_Lesson.module.css';


const Approval_Lesson_Plan = () => {
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
                    <th>Name  </th>
		            <td> Anvash Reddy  </td>
                </tr>
                <tr>
                    <th>Faculty Id </th>
		            <td> 123567  </td>
                </tr>
                <tr>
                    <th>Class Name</th>
                    <td>Albert Einstein</td>
                </tr>
                <tr>
					<th>Total Topics </th>
					<td> 40  </td>
                </tr>
                <tr>
                    <th>Total Hours  </th>
		            <td> 80 </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  );
};

export default Approval_Lesson_Plan;