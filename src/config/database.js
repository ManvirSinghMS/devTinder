const mongoose = require("mongoose")

const connectDB = async () =>{
    await mongoose.connect(
    "mongodb+srv://manvirdev:Hello%401621@namastenode.wlonzfm.mongodb.net/devTinder"
)
}  

module.exports = connectDB;



