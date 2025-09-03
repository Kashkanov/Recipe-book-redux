const User = require('../models/user');

const {createSecretToken} = require('../tokenGeneration/generateToken');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        if (!(req.body.firstname && req.body.lastname && req.body.username && req.body.email && req.body.password)) {
            res.status(400).send("All fields required");
        }


        const oldUser = await User.findOne({email: req.body.email});

        if (oldUser) {
            return res.status(409).send("User Already Exists. Please Login");
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 86400000),
            secure: true,
            httpOnly: true,
            sameSite: "None",
        });

        console.log("Cookie set successfully!");

        res.json(user);
    } catch (e) {
        console.log("Error: ", e);
    }

};

module.exports = createUser;


