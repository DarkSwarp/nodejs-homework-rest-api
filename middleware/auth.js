const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    

    if (typeof authHeader !== "string") { 
        return res.status(401).json({ message: "Not authorized" });
    }

    const [bearer, token] = authHeader.split(" ", 2);

    if (bearer !== "Bearer") {
        return res.status(401).json({ message: "Not authorized" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError" || err.name === "JsonTokenError") {
                return res.status(401).json({ message: "Not authorized" });
            }
            return next(err);
        }
        req.user = { id: decoded.id };
        next();
    });
}

module.exports = auth;
