const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Ajinkya",
        lastName: "Mishra",
        emailId: "ajinkya@mishra.com",
        password: "Ajinkya@2011",
    });

    try {
        await user.save();
    res.send("User Added Successfully");
    } catch (err) {
        res.status(400).send("Error saving the user : ", err.message);
    }
    
});


connectDB()
  .then(() => {
    console.log("Database Connection Established...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000.");
    });
  })
  .catch((err) => {
    console.error("Cannot Establish Connection...");
  });
