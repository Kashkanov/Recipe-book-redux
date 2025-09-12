const User = require('../models/user');
const bcrypt = require("bcrypt");

const env = require("dotenv");
const { createSecretToken } = require("../tokenGeneration/generateToken");

env.config();

const login = async(req, res) => {
    const { username, password } = req.body;
    if(!(username && password)) {
        return res.status(404).json({ message: "Invalid credentials" });
    }
    const user = await User.findOne( {username} );
    if(!(user && (await bcrypt.compare(password, user.password)))){
        return res.status(404).json({ message: "Invalid credentials" });
    }

    console.log("frontend_url: ", process.env.FRONTEND_URL);

    const token = createSecretToken(user);
    res.cookie("token", token, {
        //domain: process.env.FRONTEND_URL,
        path: "/",
        expires: new Date(Date.now() + 86400000),
        secure: false,
        httpOnly: true,
        sameSite: "strict",
    })

    res.json({ id: user._id, username: user.username });
};

module.exports = login;
