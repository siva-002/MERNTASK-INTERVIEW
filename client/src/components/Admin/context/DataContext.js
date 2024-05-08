import { createContext, useEffect, useState } from "react";
import Apicon from "../../../Api/Apicon";
import swal from "sweetalert";

const DataContext=createContext({})

export const DataContextprovider=({children})=>{
    const [imgfile,setimgfile]=useState()
    const [employees,setemployees]=useState()
    const fileupload=async(e)=>{
        const file=e.target.files[0]
      if(file){
        const name=file.name.toLowerCase();
      if((name.endsWith(".jpg"))||(name.endsWith(".png")) ){
        if((file?.size/1024)>500){
        //   seterror("Image Size must be less than 500kb")
        window.alert("Image Size must be less than 500kb")
        }else{
        const reader=new FileReader()
        reader.onload=()=>{
          setimgfile(reader.result)
          
        }
        reader.readAsDataURL(file)
        // setuploadfile(file)
        }
      }else{
        window.alert("JPG/PNG files only supported")
      }
    }else{
        window.alert("Please Select an image file")
    }
    }

    const getemployees=async()=>{
        const options={method:"GET",headers:{"Content-Type":"application/json"}}
        const res=await Apicon("getemployee",options)
        setemployees(res.data)
    }
    useEffect(()=>{
        getemployees()
    },[])

    const handledelete=(id,email)=>{
        swal(
            {title:`Are you sure want to delete Employee ${email}`,icon:"warning",
            dangerMode:true,
            buttons: {
                cancel: "Cancel",
                delete: {
                  text: "Delete",
                  value: true,
                }
              }
            }).then(async(action)=>{
            if(action){
                const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({f_Id:id})}
                const res=await Apicon("deleteemployee",options)
                if(res.status==201){
                    const filter=employees.filter(ele=>ele.f_Id!=id)
                    setemployees(filter)
                    swal({title:"Deleted",icon:"success"})
                }else{
                    swal({title:"Delete Failed",icon:"info"})
                }

            }else{
                swal({title:"Not Deleted",icon:"info"})
            }
        })
        
    }
    return (<DataContext.Provider value={
        {
            fileupload,imgfile,employees,setimgfile,handledelete
        }
    }>
        {children}
    </DataContext.Provider>)
}

export default DataContext