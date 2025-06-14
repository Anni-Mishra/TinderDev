const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mishraajinkya24:r6cc8xymT7e1St8Z@cluster0.ajtpea4.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
