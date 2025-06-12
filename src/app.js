const express = require("express");

const app = express();


app.get("/user/:userID/:name", (req, res) => {
    console.log(req.params);
    res.send("Hello, I'm Naruto!");
});

app.get("/", (req, res) => {
    res.send("Tatakae!, Server is running.");
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
});