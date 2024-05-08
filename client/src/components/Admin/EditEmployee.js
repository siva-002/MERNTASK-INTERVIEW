import React, { useContext, useEffect, useState } from 'react'
import Formdata from './Formdata'
import { useParams } from 'react-router-dom'
import DataContext from './context/DataContext'
import Apicon from '../../Api/Apicon'
import swal from 'sweetalert'

const EditEmployee = ({usersdata,editid}) => {
  const {employees}=useContext(DataContext)
    const [edituser,setedituser]=useState()
    const {imgfile}=useContext(DataContext)
    useEffect(()=>{
      if(editid){
        const find=employees?.filter((ele)=>ele.f_Id==editid)
        setedituser(find[0])
      }
    },[])

    const handlesubmit=async(e)=>{
        e.preventDefault()
        if(edituser.f_Mobile.length<10){
          window.alert("Mobile number should contains 10 digits")
        }else{
        const data={...edituser,["file"]:imgfile,f_Id:editid}
        console.log(data)
        const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(data)}
        const res=await Apicon("updateemployee",options)
        console.log(res)
       if(res.status==201){
          swal({title:"Employee updated",icon:"success"})
       }else if(res.status==400){
          swal({title:"Email Already Exists",icon:"info"})
       }
       else if(res.status==200){
        swal({title:"No Changes made",icon:"info"})
       }else
        swal({title:"Something Went Wrong",icon:"info",dangerMode:true})
         
       
      }

        
    }
  return (
    <div>{edituser&&<Formdata title="Edit Employee" formdata={edituser} setformdata={setedituser} handlesubmit={handlesubmit}/>}
    </div>
  )
}

export default EditEmployee