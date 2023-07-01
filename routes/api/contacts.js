const express = require("express");
const contacts = require("../../models/contacts");
const crypto = require("crypto");
const Joi = require("joi");

const router = express.Router();

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
    contacts
        .listContacts()
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
});

router.get("/:contactId", async (req, res, next) => {
    contacts
        .getContactById(req.params.contactId)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(404).json({ message: "Not found" }));
});

router.post("/", (req, res, next) => {
    const response = contactSchema.validate(req.body);
    if (response.error) {
        return res.status(400).json({ message: "missing required name field" });
    }
    const id = crypto.randomUUID();
    const body = { id, name: req.body.name, email: req.body.email, phone: req.body.phone };
    contacts.addContact(body);

    return res.json(body);
});

router.delete("/:contactId", async (req, res, next) => {
    contacts
        .removeContact(req.params.contactId)
        .then(() => res.status(200).json({ message: "contact deleted" }))
        .catch(() => res.status(404).json({ message: "Not found" }));
});

router.put("/:contactId", async (req, res, next) => {
    const response = contactSchema.validate(req.body);
    if (response.error) {
        return res.status(400).json({ message: "missing fields" });
    }
    contacts
        .updateContact(req.params.contactId, req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(404).json({ message: "Not found" }));
});

module.exports = router;
