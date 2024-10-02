import React from 'react';
import styles from './edit_subject.module.css';
import {Link} from 'react-router-dom';

const EditSubject = () => {
  return (
    <div className={styles.formcontainer}>
      <div className={styles.myform}>
        <div className={styles.formgroup}>
          <label htmlFor="name">Subject Name <span className={styles.required}>*</span></label>
          <input type="text" id="name" placeholder="subject_name" name="name" required />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="facultyname">Faculty name <span className={styles.required}>*</span></label>
          <input type="text" id="facultyname" placeholder="faculty_name" name="faculty_name" required />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="class">Class <span className={styles.required}>*</span></label>
            <select id="class" name="class" required>
              <option value="">Select Class</option>
              <option value="Associate Professor">1-CSE A</option>
              <option value="Assistant Professor">1-CSE B</option>
              <option value="Lecturer">2-CSE A</option>
              <option value="Researcher">2-CSE B</option>
              <option value="Researcher">3-CSE A</option>
              <option value="Researcher">3-CSE B</option>
              <option value="Researcher">4-CSE A</option>
              <option value="Researcher">4-CSE B</option>
            </select>
        </div>
        <div class={styles.buttongroup}>
           <Link to="/faculty_profile"><button type="button" class={styles.backbtn} >Back</button></Link>  
            <button type="submit" class={styles.createbtn}>Save</button>
          </div>
      </div>
    </div>
  );
};

export default EditSubject;
