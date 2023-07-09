const express = require("express");
const contacts = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getContactByID);

router.post("/", contacts.setContacts);

router.delete("/:contactId", contacts.deleteContactByID);

router.put("/:contactId", contacts.changeContactByID);

router.patch("/:contactId/favorite", contacts.changeContact);

module.exports = router;
