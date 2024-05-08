import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const nav=useNavigate()
  const handlelogout=()=>{
    sessionStorage.removeItem("USERNAME")
    nav("/")
  }
  return (
    <div >
        <div className='logo'>Logo</div>
       <div className='admin-navbar'>
        <div className='user-nav'>
          
           <Link to="/admin/home"><span>Home</span></Link>
           <Link to="/admin/listemployee"> <span>Employeelist</span></Link>
        </div>
        <div className='user-info'>
            <span>{sessionStorage.getItem("USERNAME").toUpperCase() }-  <span onClick={handlelogout}>Logout</span></span>
           
        </div>
        </div>
    </div>
  )
}

export default Navbar