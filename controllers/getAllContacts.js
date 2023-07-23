const { Contact } = require("../schemas/index");

const getAllContacts = async (req, res, next) => {
    try {
        let result;
        if (req.query.favorite === undefined) {
            result = await Contact.find({ owner: req.user.id });
        } else {
            result = await Contact.find({ owner: req.user.id, favorite: req.query.favorite });
        }

        if (req.query.page === undefined) {
            return res.status(200).json(result);
        }
        return res.status(200).json(result.slice((req.query.page - 1) * req.query.limit, req.query.page * req.query.limit));
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllContacts,
};
