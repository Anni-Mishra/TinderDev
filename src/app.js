const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const app = express();


app.use("/admin", adminAuth);

app.get("/user", (req, res, next) => {
    res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res, next) => {
    res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res, next) => {
    res.send("Deleted a User");
});



app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
});