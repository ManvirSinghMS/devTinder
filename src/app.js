const express = require("express")

const app  = express()

app.get("/",(req, res)=>{
    res.send("not")
})

app.get("/abcd", (req, res) => {
    console.log(req.query)
    res.send({ firstName: "Parnit", lastName: "Kaur" });
});


app.get("/abcd/:abcdId/:name/:password", (req, res) => {
    console.log(req.params)
    res.send({ firstName: "Parnit", lastName: "Kaur" });
});

app.get("/ac", (req, res) => {
    res.send({ firstName: "Parnit", lastName: "Kaur" });
});


app.get("/user",(req,res)=>{
    res.send({firstName: "Manvir", lastName: "Singh"})
})

app.delete("/user",(req,res)=>{
    res.send("User Deleted successfully")
})

app.post("/user",(req,res)=>{
    res.send("We Post a new photo on instagram")
})

app.get("/test",(req, res)=>{
    res.send("Hiiiiiiii Guys Amerrikkkaa yaaa from express server")
})
app.get("/Hehehehe",(req, res)=>{
    res.send("Muuuuhehehehhehhehhehhehehhehheehehehehhee")
})

app.listen(2103, ()=>{
    console.log("Server is successfully running on port 2103....")
})