const Contact = require("../schemas/contactsSchemas");

const changeContact = async (req, res, next) => {
    try {
        const contact = {
            favorite: req.body.favorite,
        };
        if (req.body.favorite === undefined) {
            return res.status(400).json({ message: "missing field favorite" });
        }
        const result = await Contact.findByIdAndUpdate(req.params.contactId, contact, { new: true });
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
    changeContact,
};
