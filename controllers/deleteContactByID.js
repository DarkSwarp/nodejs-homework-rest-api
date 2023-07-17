const {Contact} = require("../schemas/index");

const deleteContactByID = async (req, res, next) => {
    try {
        const result = await Contact.findByIdAndRemove(req.params.contactId);
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json({ message: "contact deleted" });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    deleteContactByID,
};
