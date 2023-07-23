const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
});

module.exports = mongoose.model("contacts", schema);
