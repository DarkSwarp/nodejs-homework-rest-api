const contacts = require("../models/contacts");
const crypto = require("crypto");
const contactSchema = require("../schemas/contactsSchemas");

const getAll = async (req, res, next) => {
    await contacts
        .listContacts()
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
};

const getContactByID = async (req, res, next) => {
    await contacts
        .getContactById(req.params.contactId)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(404).json({ message: "Not found" }));
};

const setContacts = async (req, res, next) => {
    const response = contactSchema.validate(req.body);
    if (response.error) {
        return res.status(400).json({ message: "missing required name field" });
    }
    const id = crypto.randomUUID();
    const body = { id, name: req.body.name, email: req.body.email, phone: req.body.phone };
    await contacts.addContact(body);

    return res.json(body);
};

const deleteContactByID = async (req, res, next) => {
    await contacts
        .removeContact(req.params.contactId)
        .then(() => res.status(200).json({ message: "contact deleted" }))
        .catch(() => res.status(404).json({ message: "Not found" }));
};

const changeContactByID = async (req, res, next) => {
    const response = contactSchema.validate(req.body);
    if (response.error) {
        return res.status(400).json({ message: "missing fields" });
    }
    await contacts
        .updateContact(req.params.contactId, req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(404).json({ message: "Not found" }));
};

module.exports = {
    getAll,
    getContactByID,
    setContacts,
    deleteContactByID,
    changeContactByID,
};
