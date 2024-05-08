import React, { useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import Home from './Home'
import EmployeeList from './EmployeeList'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'

const Dashboard = () => {
    const {path}=useParams()
  

    const [editid,seteditid]=useState()
  return (
    sessionStorage.getItem("USERNAME")?    
    <div className='admin-dashboard'>
        <div>
        <Navbar/>
        </div>
       <div className='admin-content'>
        {path=="home"?
        <Home/>
        :path=="listemployee"?
        <EmployeeList seteditid={seteditid}/>
        :path=="addemployee"?
            <AddEmployee/>:
        path=="editemployee"?<EditEmployee   editid={editid}/>:''
        }
        </div>
    </div>:
    <span>You Dont Have Permission to access</span>
  )
}

export default Dashboard