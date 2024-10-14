const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: [true, "username is requires"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password : {
        type: String,
        required: [true, "Password is required"]
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
