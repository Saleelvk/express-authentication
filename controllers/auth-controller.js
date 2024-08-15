const User = require("../models/user-model");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

module.exports = {
    signup: asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json("please enter all fields")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(200).json({ message: "user created", user: user })
    }),

    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json("please enter all fields")
        }

        const user = await User.findOne({email});

        if(!user) {
            res.status(404).json("User not found")
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            res.status(400).json("password incorrect");
        }

        res.status(200).json({ message: "user logged in", user: user })
    })
}
