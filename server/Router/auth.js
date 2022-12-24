const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const { authenticate } = require("../middleware/autheticate")
// connecting to database for sending data to database
require('../DB/conn');

// connecting to userschema
const User = require('../Model/userSchema');

// setting router for / request
router.get('/', (req, res) => {
    res.send("Router call");
});

// router for /register request
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
            // hash vala function call hogas

            const r = await user.save();
            // console.log(user);
            if (r)
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

        // any field is missing
        if (!email || !password)
            return res.status(400).json({ error: "Fill the details" });

        // if email is in database or not
        const lgnDtl = await User.findOne({ email: email });

        // verifiying the password
        if (lgnDtl) {
            const pwdMth = await bcrypt.compare(password, lgnDtl.password);

            token = await lgnDtl.generateAuthToken();
            // console.log(token);

            // storing token in cookie         
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });


            if (!pwdMth) {
                res.status(400).json({ error: "Invalid credentials" });
            }
            else {
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
    res.send("About");
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








