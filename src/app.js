const express = require("express");

const app = express();



app.use("/greet", (req, res) => {
    res.send("Hello, I'm Naruto!");
});

app.use("/", (req, res) => {
    res.send("Tatakae!");
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
});