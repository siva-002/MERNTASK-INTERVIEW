import React, { useContext, useState } from 'react'
import profile from "../image/profile.png"
import DataContext from './context/DataContext'
const Formdata = ({title,formdata,setformdata,handlesubmit}) => {
  
    const {fileupload,imgfile}=useContext(DataContext)
    const handlechange=(e)=>{
        switch(e.target.type){
            case "text":
                if(e.target.name=="f_Name"){
                    const pattern=/^[a-zA-Z\s]*$/
                    if(!pattern.test(e.target.value)){
                        window.alert("Name should only Contains alphabets")
                    }else{
                        setformdata({...formdata,[e.target.name]:e.target.value})
                    }
                }
                else if(e.target.name=="f_Mobile"){
                    const pattern=/^\d*$/
                    if(!pattern.test(e.target.value)){
                        window.alert("Mobile should contains only numbers")
                    }else{
                        e.target.value.length<=10?
                        setformdata({...formdata,[e.target.name]:e.target.value}):
                        window.alert("Mobile number should Contains 10 digits")
                    }
                }
                break;
            case "checkbox":           
                setformdata({...formdata,[e.target.name]:e.target.value})
                console.log()
                break;
            case "file":
                break
            default:
                setformdata({...formdata,[e.target.name]:e.target.value})
                break;
        }
        
    }
   
  return (
    <div className='addemployee '>
    <div className='title'>
           {title}
    </div>
    <div className='add-form-con'>
    <form onSubmit={handlesubmit}>
        <div>
            <label>Name</label>
            <input type="text" name="f_Name" required  value={formdata?.f_Name} onChange={handlechange}/>
        </div>
        <div>
            <label>Email</label>
            <input type="email"name="f_Email" required onChange={handlechange} value={formdata?.f_Email}/>
        </div>
        <div>
            <label>Mobile No</label>
            <input type="text" name="f_Mobile" required onChange={handlechange} value={formdata?.f_Mobile}/>
        </div>
        <div>
            <label>Designation</label>
            <select  name="f_Designation" required onChange={handlechange} value={formdata?.f_Designation}>
                <option></option>
                <option value="HR">HR</option>
                <option value="MANAGER">MANAGER</option>
                <option value="SALES">SALES</option>
            </select>
        </div>
        <div>
            <label>Gender</label>
           <div><input type="radio" required name="f_gender" value="M" id="genderm"onChange={handlechange} checked={formdata?.f_gender=="M"?true:false}/><label htmlFor='genderm'>Male</label></div> 
           <div> <input type="radio" required name="f_gender" value="F" id="genderf" onChange={handlechange} checked={formdata?.f_gender=="F"?true:false}/><label htmlFor='genderf'>Female</label></div>
        </div>
        <div>
            <label>Course</label>
           <div><input type="checkbox"   name="f_Course" value="MCA" id="mca"onChange={handlechange} checked={formdata?.f_Course=="MCA"?true:false}/><label htmlFor='mca'>MCA</label></div> 
           <div> <input type="checkbox" name="f_Course" value="BCA" id="bca"onChange={handlechange} checked={formdata?.f_Course=="BCA"?true:false}/><label htmlFor='bca'>BCA</label></div>
           <div> <input type="checkbox"  name="f_Course" value="BSC" id="bsc"onChange={handlechange} checked={formdata?.f_Course=="BSC"?true:false}/><label htmlFor='bsc'>BSC</label></div>
        </div>
        <div>
            <label>Image Upload</label>
            <img src={imgfile||formdata.f_Image||profile}/>
            <input id="fileupload" type="file"  onChange={fileupload} name="file" />
            <label htmlFor='fileupload' className='choosefilebtn'>Choose file</label>
        </div>
        <div>
            <button type="submit">
                {title.toLowerCase()=="create employee"?
                'Submit':"Update"
            }</button>
        </div>
    </form>
    </div>
</div>
  )
}

export default Formdata