const express=require("express")
const { home, loginuser, addemployee, getemployee, updateemployee, deleteemployee } = require("./Api")
const router=express.Router()


router.get("/",(req,res)=>home(req,res))
router.post("/login",(req,res)=>loginuser(req,res))
router.post("/addemployee",(req,res)=>addemployee(req,res))
router.post("/updateemployee",(req,res)=>updateemployee(req,res))
router.post("/deleteemployee",(req,res)=>deleteemployee(req,res))

router.get("/getemployee",(req,res)=>getemployee(req,res))

module.exports=router