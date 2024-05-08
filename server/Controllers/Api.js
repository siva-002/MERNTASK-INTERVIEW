const {Login,Employee}=require("../Models/dbmodel")
const { generatehash, checkpassword } = require("./Hashing")
const { v4: uuid } = require("uuid");



const home=async(req,res)=>{
    // const pass=await generatehash("admin")
    // const user=new Login({
    //     f_sno:2,
    //     f_username:"admin",
    //     f_pwd:pass
    // })
    // await user.save()
    res.send("home")
}

const loginuser=async(req,res)=>{
    try{
       const {username,password}=req.body
        const finduser=await Login.findOne({f_username:username})

        if(finduser){
            const checkpass=await checkpassword(password,finduser.f_pwd)
            console.log(checkpass)
            if(checkpass)
              res.status(200).json({status:200,msg:"Login Success"})
            else
            res.status(401).json({status:401,msg:"Invalid password"})
        }else{
            res.status(404).json({status:404,msg:"Invalid Email"})
        }
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}


const addemployee=async(req,res)=>{
    try{
       
        const {f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course,file}=req.body 
        
        const checkemail=await Employee.findOne({f_Email:f_Email})
        if(!checkemail){
        const add=new Employee({f_Id:uuid(),f_Image:file,
            f_Name:f_Name,f_Email:f_Email,f_Mobile:f_Mobile,f_Designation:f_Designation,f_gender:f_gender,
            f_Course:f_Course,
            f_Createdate:new Date()})

        await add.save()
        res.status(201).json({status:201,msg:"added"})
        }else{
            res.status(200).json({status:200,msg:"Email ALready Exists"})
        }
           
    
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const getemployee=async(req,res)=>{
    try{
        const findemployees=await Employee.find({})
        res.status(200).json({status:200,data:findemployees})
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const updateemployee=async(req,res)=>{
    try{
        const {f_Id,f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course,file}=req.body 

        const checkemail=await Employee.findOne({f_Email:f_Email,f_Id:{$ne:f_Id} } )

        if(!checkemail){
            const up=await Employee.updateOne({f_Id:f_Id},
                {$set:{
             f_Image:file,
            f_Name:f_Name,f_Email:f_Email,f_Mobile:f_Mobile,f_Designation:f_Designation,f_gender:f_gender,
            f_Course:f_Course
            }})
          
            if(up.modifiedCount){
                res.status(201).json({status:201,msg:"Employee Updated"})
            }else if(up.matchedCount){
                res.status(200).json({status:200,msg:"No Changes Made"})
            }
        }else{
            res.status(400).json({status:400,msg:"Email Already Exists"})
        }

    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const deleteemployee=async(req,res)=>{
    try{
        const empid=req.body.f_Id
        const del=await Employee.deleteOne({f_Id:empid})
        if(del.deletedCount){
            res.status(201).json({status:201,msg:"Employee Deleted"})
        }else{
            res.status(200).json({status:200,msg:"Employee Deleted"})
        }
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}
module.exports={home,loginuser,addemployee,getemployee,updateemployee,deleteemployee}