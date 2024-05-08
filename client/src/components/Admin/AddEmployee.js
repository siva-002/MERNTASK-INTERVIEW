import React, { useContext, useState } from 'react'
import Formdata from './Formdata'
import DataContext from './context/DataContext'
import Apicon from '../../Api/Apicon'
import swal from 'sweetalert'

const AddEmployee = () => {
    const [formdata,setformdata]=useState({f_Name:"",f_Email:"",f_Mobile:"",f_Designation:"",f_gender:"",
    f_Course:""})
    const {imgfile}=useContext(DataContext)
    const handlesubmit=async(e)=>{
        e.preventDefault()
        if(formdata.f_Mobile.length<10){
          window.alert("mobile number should contain 10 digits")
        }else{
        const data={...formdata,file:imgfile}
        const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}
        const res=await Apicon("addemployee",options)
       if(res.status==201){
        swal({title:"Employee Added",icon:"success"})
       }else if(res.status==200){
        swal({title:"Employee Email Already EXists",icon:"info",dangerMode:true})
       }else{
        swal({title:"Something Went Wrong",icon:"info",dangerMode:true})
       }
        }
    }
  return (
  <div>
        <Formdata title="Create Employee" formdata={formdata} setformdata={setformdata} handlesubmit={handlesubmit}/>
  </div>
  )
}

export default AddEmployee