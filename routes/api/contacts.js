const express = require("express");
const contacts = require("../../controllers/index");

const router = express.Router();

router.get("/", contacts.getAllContacts);

router.get("/:contactId", contacts.getContactByID);

router.post("/", contacts.setContact);

router.delete("/:contactId", contacts.deleteContactByID);

router.put("/:contactId", contacts.changeContactByID);

router.patch("/:contactId/favorite", contacts.changeContact);

module.exports = router;
