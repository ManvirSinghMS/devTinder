const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth")
const requestRouter = require("./routes/requests")
const profileRouter = require("./routes/profile")


app.use("/", authRouter);       // signup → /auth/signup, login → /auth/login
app.use("/", requestRouter);
app.use("/", profileRouter);

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
