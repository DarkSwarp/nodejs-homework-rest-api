const { Contact } = require("../schemas/index");

const getAllContacts = async (req, res, next) => {
    try {
        const result = await Contact.find({owner: req.user.id});
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllContacts,
};
