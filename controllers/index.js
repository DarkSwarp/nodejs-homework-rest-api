const { getAllContacts } = require('./getAllContacts');
const { changeContact } = require("./changeContact"); 
const { changeContactByID } = require("./changeContactByID");
const { deleteContactByID } = require("./deleteContactByID");
const { getContactByID } = require("./getContactByID");
const { setContact } = require("./setContact");
const { createUser } = require("./register");
const { login } = require("./login");
const { logOut } = require("./logout");
const { currentUser } = require("./currentUser");

module.exports = {
    getAllContacts,
    changeContact,
    changeContactByID,
    deleteContactByID,
    getContactByID,
    setContact,
    createUser,
    login,
    logOut,
    currentUser,
};
