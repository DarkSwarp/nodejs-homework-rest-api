const { Users } = require("../schemas/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        const user = await Users.findOne({ email });

        if (user === null) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

       await Users.findOneAndUpdate({ _id: user._id }, { $set: { token } });

        return res.status(200).json({ message: `user: {email: ${user.email}, subscription: ${user.subscription}}` });
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

module.exports = {
    login,
};
