const { Users } = require("../schemas/index");

const currentUser = async (req, res, next) => {
    try {
        const result = await Users.findOne({ _id: req.user.id });
        if (result === null) {
            return res.status(401).json({ message: "Not authorized" });
        }
        return res.status(200).json({ email: result.email, subscription: result.subscription });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    currentUser,
};
