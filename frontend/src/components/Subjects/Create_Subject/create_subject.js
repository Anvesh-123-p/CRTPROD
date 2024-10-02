import React from 'react';
import styles from './create_subject.module.css';

const CreateSubject = () => {
  return (
    <div className={styles.formcontainer}>
      <div className={styles.myform}>
        <div className={styles.formgroup}>
          <label htmlFor="name">Subject Name <span className={styles.required}>*</span></label>
          <input type="text" id="name" placeholder="subject_name" name="name" required />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="facultyname">Faculty name <span className={styles.required}>*</span></label>
          <input type="text" id="email" placeholder="faculty_name" name="faculty_name" required />
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
            <button type="button" class={styles.backbtn}>Back</button>
            <button type="submit" class={styles.createbtn}>Create</button>
          </div>
      </div>
    </div>
  );
};

export default CreateSubject;
