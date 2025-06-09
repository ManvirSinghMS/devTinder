const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    //validation of data
    validateSignUpData(req)
    
    // Encrypt the password
    const {firstName, lastName, emailId, password} = req.body
    const passwordHash = await bcrypt.hash(password,10)
    console.log(passwordHash)

    // creating a new instance of user model
      const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash
      })


    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User : " + err.message);
  }
});

//API To get all the users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//API To Login
app.post("/login",async(req,res) => {
  try{
  const {emailId, password} = req.body

  const user = await User.findOne({emailId : emailId})
  if(!user){
    throw new Error("Invalid Credentials")
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if(isPasswordValid){
    res.send("Login Successful!!!")
  }else{
    throw new Error ("Invalid Credentials")
  }
  }
  catch(err){
    res.status(400).send("ERROR : " + err.message)
  }
})


//API To get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (!user) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Unable to get the user");
  }
});

//API To delete the user
app.delete("/user", async (req, res) => {
  const UserId = req.body.UserId;
  try {
    const user = await User.findByIdAndDelete({ _id: UserId });
    res.send("User Deleted Succcessfully");
  } catch (err) {
    res.status(400).send("Unable to delete the user");
  }
});

//API To Update the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATED = [
      "password",
      "about",
      "photoUrl",
      "gender",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATED.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills && data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data,{
        returnDocument: "after",
        runValidators : true,
    });
    console.log(user)
    res.send("User Updated");
  } catch (err) {
    res.status(400).send("UPDATE FAILED" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection is made");
    app.listen(2103, () => {
      console.log("Server is successfully running on port 2103....");
    });
  })

  .catch((err) => {
    console.log("Database Connection Failed");
  });
