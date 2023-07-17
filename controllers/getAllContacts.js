const {Contact} = require("../schemas/index");

const getAllContacts = async (__, res, next) => {
    try {
        const result = await Contact.find();
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllContacts,
};
