const path = require("node:path");
const multer = require("multer");

const filePath = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
    destination: filePath,
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage });

module.exports = upload;
