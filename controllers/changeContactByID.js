const { Contact } = require("../schemas/index");

const changeContactByID = async (req, res, next) => {
    try {
        const contact = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            favorite: req.body.favorite,
        };
        if (req.body.name === undefined) {
            return res.status(400).json({ message: "contacts validation failed: name: Set name for contact" });
        }
        const result = await Contact.findByIdAndUpdate(req.params.contactId, contact, { new: true });
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    changeContactByID,
};
