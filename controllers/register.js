const { Users } = require("../schemas/index");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const crypto = require("crypto");
const { sendEmail } = require("./email");

const createUser = async (req, res) => {
    try {
        const { password, email, subscription } = req.body;

        const userEmail = await Users.findOne({ email });

        if (userEmail !== null) {
            return res.status(409).json({ message: "Email in use" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const result = await Users.create({ password: passwordHash, email, subscription, avatarURL, verificationToken: crypto.randomUUID() });

        sendEmail(email, result.verificationToken);
        return res.status(201).json({ message: `user: {email: ${result.email}, subscription: ${result.subscription}}` });
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

module.exports = {
    createUser,
};
