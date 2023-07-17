const {Contact} = require("../schemas/index");

const getContactByID = async (req, res, next) => {
    try {
        const result = await Contact.findById(req.params.contactId);
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getContactByID,
};
