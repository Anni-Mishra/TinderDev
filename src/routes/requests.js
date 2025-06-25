const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth"); 


requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("Sending request... ");

    res.send(user.firstName + " Sent The Connection Request ! ");
}); 


module.exports = requestsRouter;