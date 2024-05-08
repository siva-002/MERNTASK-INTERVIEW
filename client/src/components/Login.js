import React, { useState } from 'react'
import "./css/login.css"
import { useNavigate } from 'react-router-dom'
import Apicon from '../Api/Apicon'
import swal from 'sweetalert'
const Login = () => {
    const nav=useNavigate()
    const [userdata,setuserdata]=useState()
    const handlechange=(e)=>{
        setuserdata({...userdata,[e.target.name]:e.target.value})
    }
    const handleloginsubmit=async(e)=>{
        e.preventDefault()
        const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(userdata)}
        const res=await Apicon("login",options)
       if(res.status==200){
        sessionStorage.setItem("USERNAME",userdata.username)
         nav("/admin/home")
       }else if(res.status==401){
        swal({title:"Invalid Password",icon:"info"})
       }else if(res.status==404){
        swal({title:"Invalid Username",icon:"warning",dangerMode:true})
       }else{
        swal({title:"Something Went Wrong",text:"Try Again Later",icon:"info",dangerMode:true })
       }
        
    }
  return (
    <div>
        <div className='navbar'>
           <span>  Loginpage</span>
        </div>
    <div className="form-con">
       
        <form method="" action="" onSubmit={handleloginsubmit}>
            <div> <h2>Login</h2></div>
          <div>
                <label>USERNAME :</label>
                <input type="text" name="username" required onChange={handlechange}/>
            </div>
            <div>
                <label>PASSWORD :</label>
                <input type="password" name="password" required onChange={handlechange}/>
            </div>
            <div>
                <label></label>
                <button type="submit" name="Loginbtn" required >Login</button>
            </div>
        </form>
    </div>


    </div>
  )
}

export default Login