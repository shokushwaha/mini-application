const User = require('../Model/userSchema')
const jwt = require('jsonwebtoken')
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })
        if (!rootUser) throw new Error("User not found");

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch (error) {

        res.status(401).send("Unauthorized");
        console.log(error);
    }

}
module.exports = { authenticate }

