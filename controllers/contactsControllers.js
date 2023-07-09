const Contact = require("../schemas/contactsSchemas");

const getAll = async (__, res, next) => {
    try {
        const result = await Contact.find();
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};

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

const setContacts = async (req, res) => {
    try {
        const contact = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            favorite: req.body.favorite,
        };

        const result = await Contact.create(contact);
        return res.status(201).json(result);
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

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
    getAll,
    getContactByID,
    setContacts,
    deleteContactByID,
    changeContactByID,
    changeContact,
};
