const mongoose=require("mongoose")


const loginschema=new mongoose.Schema({
    f_sno:{},
    f_username:{},
    f_pwd:{}
})

const employeeschema=new mongoose.Schema({
    f_Id:{ },
    f_Image:{},
    f_Name:{}
    ,f_Email:{}
    ,f_Mobile:{    },
    f_Designation:{},
    f_gender:{}
    ,f_Course:{}
    ,f_Createdate:{}
})

const Login=mongoose.model("t_login",loginschema)
const Employee=mongoose.model("t_employee",employeeschema)

module.exports={Login,Employee}












