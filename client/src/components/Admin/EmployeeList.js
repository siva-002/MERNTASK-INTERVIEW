import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import profile from "../image/profile.png"
import DataContext from './context/DataContext'
import moment from 'moment/moment'
const EmployeeList = ({usersdata,seteditid}) => {
    const {employees,setimgfile,handledelete}=useContext(DataContext)
    const nav=useNavigate()
    const [search,setsearch]=useState("")
   
    const handleedit=(id)=>{
        seteditid(id)
        setimgfile("")
        const path=`/admin/editemployee`
        nav(path)
    }
 
  return (
    <div className='employeelist'>
        <div className='title'>
            Employee List
        </div>
        <div className='employee'>
            <div className='admin-actions'>
                <span>Total Count : <b>{employees?.length || 0}</b></span>
               <Link to="/admin/addemployee"><span>Create Employee</span></Link> 
            </div>
    
        <div className='employee-details'>
            <div className='search-bar'>
               Search :<input type='text' onChange={(e)=>setsearch(e.target.value)} placeholder='enter search keyword'/>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Unique Id</th><th>Image</th><th>Name</th>
                    <th>Email</th><th>Mobile No</th><th>Designation</th>
                    <th>Gender</th><th>Course</th><th>Create Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {employees?.filter((ele)=>ele.f_Name.toLowerCase().includes(search.toLowerCase())).map((item,index)=>(
                <tr key={index}>
                <td>
                    {item.f_Id?.substr(0,5)}...
                </td>
                <td>
                    {/* {item.image} */}
                    <img src={item.f_Image||profile}/>
                </td>
                <td>
                    {item.f_Name}
                </td>
                <td>
                    {item.f_Email}
                </td>
                <td>
                    {item.f_Mobile}
                </td>
                <td>
                    {item.f_Designation}
                </td>
                <td>
                    {item.f_gender}
                </td>
                <td>
                    {item.f_Course}
                </td>
                <td>
                    {moment(item.f_Createdate).format('DD-MMM-YY')}
                </td>
                <td>
                   <span onClick={(e)=>handleedit(item.f_Id)} className='action-btn'>Edit</span> || 

                   <span onClick={(e)=>handledelete(item.f_Id,item.f_Email)} className='action-btn'> Delete</span>
                </td>
                </tr>
                ))}
             </tbody>
             <tfoot></tfoot>
            </table>
        </div>
        </div>
    </div>
  )
}

export default EmployeeList