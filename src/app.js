const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middlewares/auth"); 

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);

    const { firstName, lastName, gender, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //Creating new instance of the User model
    const user = new User({
      firstName,
      lastName,
      gender,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
   try {
    const { emailId, password } = req.body;

    const user = await User.findOne({emailId: emailId}); // user is instance
    if(!user) {
        throw new Error("Invalid credentials!! ");
    } 
    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid) {
        const token = await user.getJWT(); // getJWT is mongoose schema method - works on instance level only

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.send("Login Successfull... ");
    } else {
        throw new Error ("Invalid credentials!! ");
    }

   } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  } 
});

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
  
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("Sending request... ");

    res.send(user.firstName + " Sent The Connection Request ! ");
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
