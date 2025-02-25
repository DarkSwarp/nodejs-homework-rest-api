const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, "Set password for user"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: String,
});

module.exports = mongoose.model("users", schema);
