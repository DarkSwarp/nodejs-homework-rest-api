const { getAllContacts } = require('./getAllContacts');
const { changeContact } = require("./changeContact"); 
const { changeContactByID } = require("./changeContactByID");
const { deleteContactByID } = require("./deleteContactByID");
const { getContactByID } = require("./getContactByID");
const { setContact } = require("./setContact");

module.exports = {
    getAllContacts,
    changeContact,
    changeContactByID,
    deleteContactByID,
    getContactByID,
    setContact,
};
