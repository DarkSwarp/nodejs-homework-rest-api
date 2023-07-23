const { Users } = require("../schemas/index");

const subscription = async (req, res, next) => {
    try {
        if (req.body.subscription === undefined) {
            return res.status(400).json({ message: "missing field subscription" });
        }

        if ((req.body.subscription !== "pro") & (req.body.subscription !== "starter") & (req.body.subscription !== "business")) {
            return res.status(400).json({ message: `users validation failed: subscription: ${req.body.subscription} is not a valid enum value for path subscription.` });
        }

        const result = await Users.findOneAndUpdate({ _id: req.user.id }, { subscription: req.body.subscription }, { new: true });
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

module.exports = {
    subscription,
};
