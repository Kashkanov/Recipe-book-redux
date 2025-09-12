const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    console.log("cookies: ", req.cookies);      //<===
    if(!token) return res.sendStatus(401).json({ error: "Unauthorized" });

    jwt.verify(token,process.env.TOKEN_KEY, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;