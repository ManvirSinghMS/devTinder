const express = require("express")
const connectDB   = require("./config/database")
const app  = express()
const User = require("./models/user")



app.post("/signup",async (req,res)=>{
   const user = new User({
    firstName : "Manvir",
    lastName : "Singh",
    emailId : "ManvirSingh@gmail.com",
    password : "865793284",
    age : 23,
    gender : "Male"
   })
   try{
  await user.save();
  res.send("User Added Successfully")
   } catch(err){
    res.status(400).send("Error Saving the User : " + err.message)
   }

})






connectDB()
.then(()=>{
    console.log("Database Connection is made")
    app.listen(2103, ()=>{
    console.log("Server is successfully running on port 2103....")
})
})

.catch((err)=>{
    console.log("Database Connection Failed")
})
