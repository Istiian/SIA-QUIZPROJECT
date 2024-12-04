const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        Username: {
            type: String,
            required: true,
            unique: true,
        },

        Password: {
            type: String,
            required: true
        },
        HighestScore:{
            type: Number,
            default:0
        }
    }
)

const User = mongoose.model("User", UserSchema);

module.exports = User;