const { Users } = require("../schemas/index");

const logOut = async (req, res) => {
    try {
        const result = await Users.findOne({ _id: req.user.id });
        if (result.token === null) {
            return res.status(401).json({ message: "Not authorized" });
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { $set: { token: null } });
        return res.status(204).end();
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

module.exports = {
    logOut,
};
