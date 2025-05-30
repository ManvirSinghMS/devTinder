const express = require("express")

const app  = express()
const {adminAuth, userAuth} = require("./middlewares/auth")
app.use("/admin",adminAuth)



app.get("/user/userLogin", (req,res)=>{
    res.send("User logged in successfully")
})


app.get("/user",userAuth, (req,res)=>{
    res.send("User data Send")
})



app.get("/admin/getAllData", (req,res)=>{
    res.send("All data Send")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a User")
})


app.listen(2103, ()=>{
    console.log("Server is successfully running on port 2103....")
})