const fs = require("fs/promises");
const path = require("node:path");

const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
};

const getContactById = async (contactId) => {
    const contact = JSON.parse(await fs.readFile(filePath, "utf-8")).filter((contact) => contact.id === contactId);
    if (contact.length === 0) {
        throw new Error();
    } else {
        return contact;
    }
};

const removeContact = async (contactId) => {
    const contacts = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(filePath, JSON.stringify(newContacts));
    if (newContacts.length === contacts.length) {
        throw new Error();
    } else {
        return newContacts;
    }
};

const addContact = async (body) => {
    const contacts = JSON.parse(await fs.readFile(filePath, "utf-8"));
    contacts.push(body);
    await fs.writeFile(filePath, JSON.stringify(contacts));
    return contacts;
};

const updateContact = async (contactId, body) => {
    const contacts = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const [newContact] = contacts.filter((contact) => contact.id === contactId);
    newContact.id = contactId;
    newContact.name = body.name;
    newContact.email = body.email;
    newContact.phone = body.phone;
    contacts.map((contact) => {
        if (contact.id === contactId) {
            contact = newContact;
        }
        return contact;
    });
    await fs.writeFile(filePath, JSON.stringify(contacts));
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
