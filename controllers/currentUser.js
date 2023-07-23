const { Users } = require("../schemas/index");

const currentUser = async (req, res, next) => {
    try {
        const result = await Users.findOne({ _id: req.user.id }).select({ _id: 0, email: 1, subscription: 1 });
        if (result === null) {
            return res.status(401).json({ message: "Not authorized" });
        }
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    currentUser,
};
