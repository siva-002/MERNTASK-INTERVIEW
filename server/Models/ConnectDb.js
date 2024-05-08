const mongoose=require("mongoose")
const connect=()=>{
    const uri = process.env.DB_URL;

    try{
        mongoose.connect(uri).then(()=>{
            console.log("DB connected")
        })
        
    }catch(error){
        console.error(`Error in Db connection ${err}`)
    }
}

module.exports=connect