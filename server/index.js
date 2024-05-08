const express=require("express")
const routerlink=require("./Controllers/Routes")
const connect=require("./Models/ConnectDb")
const dotenv=require('dotenv')
const cors=require("cors")
dotenv.config()

const app=express()
const port=process.env.PORT

connect()
app.use(express.urlencoded({limit:'5mb',extended:true}))
app.use(express.json({limit:"5mb"}))
app.use(cors({origin:"http://localhost:3000",methods:['GET','POST','DELETE'],allowedHeaders:['Content-Type']}))
app.use("/api",routerlink)
app.listen(port,()=>{
    console.log(`Server running in ${port}`)
})
