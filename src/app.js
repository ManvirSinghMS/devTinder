const express = require("express")
const connectDB   = require("./config/database")
const app  = express()
const User = require("./models/user")

app.use(express.json())

app.post("/signup",async (req,res)=>{
   const user = new User(req.body)
   try{
  await user.save();
  res.send("User Added Successfully")
   } catch(err){
    res.status(400).send("Error Saving the User : " + err.message)
   }

})

//API To get all the users
app.get("/feed",async (req,res)=>{
    try{
    const users = await User.find({})
    res.send(users)
    }catch(err){
     res.status(400).send("Something went wrong")
    }
})

//API To get user by email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId
    try{
      const user = await User.find({emailId : userEmail})
      if(!user){
        res.status(400).send("User not found")
      }else{
      res.send(user)
      }

    }
    catch(err){
        res.status(400).send("Unable to get the user")
    }
})

//API To delete the user
app.delete("/user",async(req,res)=>{
    const UserId = req.body.UserId
    try{
        const user = await User.findByIdAndDelete({_id : UserId})
        res.send("User Deleted Succcessfully")
    } catch(err){
        res.status(400).send("Unable to delete the user")
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
