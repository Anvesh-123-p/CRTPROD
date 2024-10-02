import logo from './logo.svg';
import './App.css';


import Login from './components/Login/Login';
import Hod_Home from './components/Hod/Hod_Home/Hod_Home';
import Class_View from './components/Hod/Class_View/Class_View';
import Faculty_View from './components/Hod/Faculty_View/Faculty_View';
import Subject_view from './components/Hod/Subject_view/Subject_view';
import Approval from './components/Hod/Hod_Approval/Approval';
import Hod_Profile from './components/Hod/Hod_Profile/Hod_Profile';
import Hod_Edit from './components/Hod/Hod_Edit/Hod_Edit';

import Faculty_Home from './components/Faculty/Faculty_Home/Faculty_Home';
import Faculty_Class_View from './components/Faculty/Class_View/Class_View';
import Faculty_Faculty_View from './components/Faculty/Faculty_View/Faculty_View';
import Faculty_Subject_view from './components/Faculty/Subject_view/Subject_view';
import Faculty_Profile from './components/Faculty/Faculty_Profile/Faculty_Profile';
import Faculty_Edit from './components/Faculty/Faculty_Edit/Faculty_Edit';



import Approval_New_Account from './components/Approval_Data/Approval_New_Account/Approval_Account';
import Approval_Lesson_Plan from './components/Approval_Data/Approval_Lesson_Plan/Approval_Lesson';

import Lesson_plan from './components/Faculty/Faculty_lesson_plan/Lesson_plan';

import Create_Subject from './components/Subjects/Create_Subject/create_subject';
import Edit_Subject from './components/Subjects/Edit_Subject/edit_subject';





import Faculty_Profilel from './components/Faculty/Faculty_Profile/Faculty_Profile';

import Forgot_Pass from './components/Forget Password/Forgot_Pass/Forgot_Pass';

import { BrowserRouter as Router,Routes , Route, BrowserRouter } from 'react-router-dom';
import React, {useState} from 'react';
import SignUp from './components/Signup/SignUp';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgot_password" element={<Forgot_Pass/>} />
=======

        <Route path="/Hod/Home" element={<Hod_Home/>} /> 
        <Route path="/Hod/Class_View" element={<Class_View/>}/>
        <Route path="/Hod/Faculty_View" element={<Faculty_View/>}/>
        <Route path="/Hod/Subject_view" element={<Subject_view/>} />
        <Route path="/Hod/Approval" element={<Approval/>} />
        <Route path="/Hod/Profile" element={<Hod_Profile/>} />
        <Route path="/Hod/Edit_Profile" element={<Hod_Edit/>} />



        <Route path="/Faculty/Home" element={<Faculty_Home/>} /> 
        <Route path="/Faculty/Class_View" element={<Faculty_Class_View/>}/>
        <Route path="/Faculty/Faculty_View" element={<Faculty_Faculty_View/>}/>
        <Route path="/Faculty/Subject_view" element={<Faculty_Subject_view/>} />
        <Route path="/Faculty/Profile" element={<Faculty_Profile/>} />
        <Route path="/Faculty/Edit_Profile" element={<Faculty_Edit/>} />

        
        

      </Routes>
    </Router>
  );
}

export default App;
