const express = require("express");

const app = express();


app.get("/user", (req, res, next) => {
    console.log("Handling route 1");
    res.send("Hello, I'm Naruto!");
    next();
},
(req, res) => {
    console.log("Handling route 2");
    res.send("Hello, I'm Boruto!");
}
);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
});