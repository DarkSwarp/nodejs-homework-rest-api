const { Users } = require("../schemas/index");

const verificationToken = async (req, res, next) => {
    try {
        const result = await Users.findOne({ verificationToken: req.params.verificationToken });
        if (result === null) {
            return res.status(404).json({ message: "User not found" });
        }

       await Users.findOneAndUpdate({ verificationToken: req.params.verificationToken }, { verificationToken: null, verify: true }, { new: true });

        return res.status(200).json({
            message: "Verification successful",
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    verificationToken,
};
