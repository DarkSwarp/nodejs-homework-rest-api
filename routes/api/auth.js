const express = require("express");
const users = require("../../controllers/index");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/register", users.createUser);
router.post("/login", users.login);
router.post("/logout", auth, users.logOut);
router.get("/current", auth, users.currentUser);

module.exports = router;
