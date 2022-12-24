const User = require('../Model/userSchema')
const jwt = require('jsonwebtoken')
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        if (!token)
            res.status(401).send("No token");
        else {

            const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
            const rootUser = await User.findOne({ _id: verifyToken._id, "token": token })
            if (!rootUser)
                res.status(401).send("No user found");
            else {

                res.status(200).send("Authorized user");
                next();
            }
        }
    } catch (error) {

        res.status(401).send("Unauthorized");
        console.log(error);
    }

}
module.exports = { authenticate }

