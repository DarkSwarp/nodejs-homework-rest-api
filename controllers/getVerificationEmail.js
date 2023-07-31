const { Users } = require("../schemas/index");
const { sendEmail } = require("../services/email");

const getVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Users.findOne({ email });

        if (user === null) {
            return res.status(401).json({ message: "missing required field email" });
        }

        if (user.verify) {
            return res.status(400).json({ message: "Verification has already been passed" });
        }
        sendEmail(user.email, user.verificationToken);
        return res.status(200).json({ message: "Letter sent to your mail" });
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

module.exports = {
    getVerificationEmail,
};
