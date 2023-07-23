const { Users } = require("../schemas/index");
const path = require("node:path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const avatarPublic = path.join(__dirname, "..", "public", "avatars");
const extension = [".jpeg", ".png", ".gif", ".tiff", ".bmp", ".jpg"];

const avatar = async (req, res, next) => {
    try {
        if (req.file === undefined) {
            return res.status(400).json({ message: "missing field avatar" });
        }
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (!extension.includes(ext)) {
            await fs.unlink(req.file.path, (err) => {
                next(err);
            });
            return res.status(400).json({ message: "Invalid file format. The file must be in the following formats .jpeg, .png, .gif, .tiff, .bmp, .jpg" });
        }
        const newAvatarName = `${req.user.id}-${req.file.filename}`;
        const destinationAvatarPublic = path.join(avatarPublic, newAvatarName);
        Jimp.read(`tmp\\${req.file.filename}`)
            .then((img) => {
                return img.resize(250, 250).write(`${destinationAvatarPublic}`);
            })
            .catch((err) => {
                console.error(err);
            });
        const result = await Users.findOneAndUpdate({ _id: req.user.id }, { avatarURL: `/avatars/${newAvatarName}` }, { new: true }).select({ avatarURL: 1, _id:0 });
        if (result === null) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        const errorMessage = error.message;
        return res.status(400).json({ message: errorMessage });
    }
};

module.exports = {
    avatar,
};
