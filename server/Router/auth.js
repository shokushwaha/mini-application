const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const { authenticate } = require("../middleware/autheticate")
require('../DB/conn');

const User = require('../Model/userSchema');

router.get('/', (req, res) => {
    res.send("Router call");
});

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;


    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the boxes" });
    }

    try {
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ error: "Email already exists!" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Both password are not same!" });
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });

            const r = await user.save(); if (r)
                res.status(201).json({ message: "User registered successfully" });
            else
                res.status(500).json({ error: "failed" });
        }
    }
    catch (err) {
        console.log(err);
    }
});






// login router
router.post('/signin', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ error: "Fill the details" });

        const lgnDtl = await User.findOne({ email: email });

        if (lgnDtl) {
            const pwdMth = await bcrypt.compare(password, lgnDtl.password);
            if (!pwdMth) {
                res.status(400).json({ error: "Invalid credentials" });
            }

            else {
                token = await lgnDtl.generateAuthToken();

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                res.status(201).json({ message: "Sign in successful" });
            }
        }
        else {
            res.status(404).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(err);
    }

});

// about us page
router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);
})


// logout
router.delete("/logout", async (req, res) => {
    try {

        res.clearCookie("jwtoken");
        res.status(200).send("loggedout ");
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;








