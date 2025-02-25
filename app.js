const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("node:path");

const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/auth");
const auth = require("./middleware/auth");

require("./db");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", auth, contactsRouter);
app.use("/api/users", userRouter);
const pathFile = path.join(__dirname, "public", "avatars");
console.log(pathFile);
app.use("/avatars", express.static(pathFile));

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = app;
