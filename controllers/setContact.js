const { Contact } = require("../schemas/index");

const setContact = async (req, res) => {
    try {
        const contact = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            favorite: req.body.favorite,
            owner: req.user.id,
        };

        const result = await Contact.create(contact);
        return res.status(201).json(result);
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

module.exports = {
    setContact,
};
