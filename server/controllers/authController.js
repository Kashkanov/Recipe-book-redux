const express = require("express");

const login = require("../controllers/login");
const createUser = require("../controllers/signup");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
})
router.get("/me", authenticateToken, (req, res) => {
    res.json({ id: req.user._id, username: req.user.username });
})

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if(!token) return res.sendStatus(401).json({ error: "Unauthorized" });

    jwt.verify(token,process.env.TOKEN_KEY, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = router;