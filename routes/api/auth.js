const express = require("express");
const users = require("../../controllers/index");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");

const router = express.Router();

router.post("/register", users.createUser);
router.post("/login", users.login);
router.post("/logout", auth, users.logOut);
router.get("/current", auth, users.currentUser);
router.patch("/", auth, users.subscription);
router.patch("/avatars", auth, upload.single("avatar"), users.avatar);
router.get("/verify/:verificationToken", users.verificationToken);
router.post("/verify", users.getVerificationEmail);

module.exports = router;
