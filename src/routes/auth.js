const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);

    const { firstName, lastName, gender, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send()
});

module.exports = authRouter;