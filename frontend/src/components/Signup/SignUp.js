import React, { useState } from 'react';
import styles from './SignUp.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import{Link} from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const[classes,setclasses]=useState([])
  const[colleges,setcolleges]=useState([])

const [firstName, setfirstName] = useState("");
const [email, setEmail] = useState("");
const [gender, setGender] = useState("");
const [mobileNumber, setMobileNumber] = useState();
const [password, setPassword] = useState("");
const [roll_number, setroll_number] = useState("");
const [dept,setDept]=useState("");
const [graduation_year,setgraduation_year]=useState();
const [clgid,setclgid]=useState();
const [clsid,setclsid]=useState();
const [type,setType]=useState('ST');
const [Auth,setAuth]=useState(true);








   const navigate=useNavigate();
let url="http://127.0.0.1:8000/api/users/"
let classesurl="http://127.0.0.1:8000/api/class/"
let collegesurl="http://127.0.0.1:8000/api/college/"


const handleSubmit=(e)=>{
  console.log(e);

let data={
  "name": firstName,
  "email": email,
  "gender":gender,
  "mobile_number":mobileNumber,
  "password": password,
  "dept": dept,
  "clg_name": clgid,
  "user_type":type,
  'roll_number':roll_number,
  'class_id':clsid


}
console.log(data)

  axios.post(url,data).then(
    
    
    (response)=>{
      alert('Your Account has been succefully sent for approval, Navigating to Login ');
   
      setTimeout(() => {
        navigate('/login');
        }, 1000);
    
    }
  
  ).catch((err) =>  {
    console.log(err)
    
    alert(JSON.stringify(err.response.data))
  
  })
  e.preventDefault();
}
  const FirstName=(e)=>{
    console.log(e)
        console.log(e.target.value)
        setfirstName(e.target.value)

  }
  const user_type=(e)=>{
    console.log(e)
        console.log(e.target.value)
        if (e.target.value==='FAC')
        {
          setAuth(false); 
        }
        else{
          setAuth(true);
          axios.get(classesurl).then((response)=>{
            setclasses(response.data.data)
          })
          


        }
        axios.get(collegesurl).then((response)=>{
          setcolleges(response.data)
          console.log(colleges)
        })

        setType(e.target.value)

  }


  const newEmail=(e)=>{
    console.log(e)
        console.log(e.target.value)
        setEmail(e.target.value)

  }
  const Graduation_year=(e)=>{
    console.log(e)
        console.log(e.target.value)
        setgraduation_year(e.target.value)
  }

  const MobileNumber=(e)=>{
    console.log(e)
    console.log(e.target.value)
    setMobileNumber(e.target.value)
  }

  const Password=(e)=>{
    console.log(e)
    console.log(e.target.value)
    setPassword(e.target.value)
  }
  const Clgid=(e)=>{
    console.log(e)
    console.log(e.target.value)
    setclgid(e.target.value)
  }
  const Clsid=(e)=>{
    console.log(e)
    console.log(e.target.value)
    setclsid(e.target.value)
  }

  const Department=(e)=>{
    setDept(e.target.value)
  }
  const Roll_number=(e)=>{
    setroll_number(e.target.value)
  }

  const Gender=(e)=>{
      setGender(e.target.value)
  }
  
    return(
        <div >
            <div className={styles.body}>
             <div className={styles.box}> 
                <div className={styles.image}><img src="https://cdni.iconscout.com/illustration/premium/thumb/man-working-on-his-laptop-on-the-sofa-at-home-2511605-2131717.png" alt=""/></div>
             </div>

            <div> 
                <h1>Register Yourself</h1>   
             </div>

            
             <form className="row g-2" onSubmit={(e) => {
                handleSubmit(e);
            }}>
            <div className='row g-2'>
            <div className="col-lg-3">
                <label htmlFor="inputname" className="form-label"> Name</label>
                <input type="text" className="form-control border border-dark" onChange={(e)=>{FirstName(e)}} placeholder='Name' id="inputname" required/>
            </div>
            <div >
              <label htmlFor="exampleInputEmail1"   className="form-label" >Email</label>
              <input type="email" className="form-control border border-dark" onChange={(e)=>{newEmail(e)}} placeholder="Email" id={styles.exampleInput}  aria-describedby="emailHelp" required/>
            </div>
            
            </div>
            <div className='row g-2'>
            <div className="col-lg-3">
                <label htmlFor="inputState" className="form-label ">User Type</label>
                <select id="inputState" onChange={(e)=>{user_type(e)}} className="form-select border border-dark" required>
                <option defaultValue>Select User Type</option>
                <option value="ST">Student</option>
                <option value="FAC">Faculty </option>
                
                </select>
                </div>
            <div className="col-lg-3">
                <label htmlFor="inputState" className="form-label ">Department</label>
                <select id="inputState" onChange={(e)=>{Department(e)}} className="form-select border border-dark" required>
                <option defaultValue>Department</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electrical </option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
                <option value="EEE">EEE</option>
                </select>
                </div>
                


                
                </div>


                <div className='row g-2'>
            <div className="col-lg-3">
                <label htmlFor="inputState" className="form-label ">College Name</label>
                <select id="inputState" onChange={(e)=>{Clgid(e)}} className="form-select border border-dark" required>
                
                <option defaultValue>Select COllege name</option>
                {colleges.map((x)=>(
                <option value={x.id}>{x.name}</option>
                ))}
                
                </select>
                </div>
                {Auth&&
                <div className="col-lg-3">
                <label htmlFor="inputState" className="form-label ">Class Id</label>
                <select id="inputState" onChange={(e)=>{Clsid(e)}} className="form-select border border-dark" required>
                <option value="1">select class</option>
                 {classes.map((x)=>(
                <option value={x.class_id}>{x.dept}_{x.sem}_{x.sec}</option>
                ))}
                </select>
                </div>
}
                
                </div>

                <div className='row g-2'>

                </div>
                <div className="col-lg-3">
                <label htmlFor="inputState" className="form-label ">Gender</label>
                <select id="inputState" onChange={(e)=>{Gender(e)}} className="form-select border border-dark" required>
                
                <option defaultValue>Select Gender</option><option value="M">Male</option>
                <option value="F">Female</option>
                </select>
                </div>
            
            <div>
              <label htmlFor="exampleInputEmail1"   className="form-label" >Mobile Number</label>
              <input type="text" className="form-control border border-dark" onChange={(e)=>{MobileNumber(e)}} placeholder='Mobile Number' id={styles.exampleInput}  aria-describedby="emailHelp" required maxLength={10} minLength={10}/>
            </div>
           {Auth && <div>
              <label htmlFor="exampleInputPassword1" id={styles.labels} className="form-label">Graduation Year</label>
              <input type="text" className="form-control border border-dark" onChange={(e)=>{Graduation_year(e)}} placeholder="Graduation Year" id={styles.exampleInput} required minLength={4} maxLength={4}/>
            </div>}

            <div>
              <label htmlFor="exampleInputEmail1"   className="form-label" >Password</label>
              <input type="password" className="form-control border border-dark"  onChange={(e)=>{Password(e)}} placeholder='Password' id={styles.exampleInput}  required minLength={10}/>
            </div>
            {Auth &&<div>
              <label htmlFor="exampleInputPassword1" id={styles.labels} className="form-label">Roll Number</label>
              <input type="text" className="form-control border border-dark"  onChange={(e)=>{Roll_number(e)}} placeholder='Roll Number' id={styles.exampleInput}  required/>
            </div>}
            <Link className="form-check-label" id={styles.acc2}  htmlFor="exampleCheck1" to="/login/">Click Here to Login </Link>

            
            <button type="submit"  className={`btn btn-dark ${styles.buttons}`}>Submit</button>
            </form>
            </div>
        </div>
    );
};

export default SignUp;