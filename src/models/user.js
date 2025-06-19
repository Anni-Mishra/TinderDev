const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        required: true,
        validate: function(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid!");
            }
        },
    }, 
    photoURL: {
        type: String,
    },
    about: {
        type: String,
        default: "An aspiring Software Developer...",
    },
    skills: {
        type: [String],
    }
},
{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;