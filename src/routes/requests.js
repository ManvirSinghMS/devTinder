const express = require('express')
const requestRouter = express.Router()
const { userAuth } = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending connection Request");

  res.send(
    user.firstName + " " + user.lastName + " Sends the conection request"
  );
});



module.exports = requestRouter;
