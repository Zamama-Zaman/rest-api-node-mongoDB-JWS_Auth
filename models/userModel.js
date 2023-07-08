const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "name field is required"],
        },
        email:{
            type: String,
            required: [true, "email field is required"],
            unique: [true, "email is not Unique"],
        },
        password:{
            type: String,
            required: [true, "password field is required"],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);