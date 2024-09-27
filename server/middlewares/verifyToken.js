const jwt=require('jsonwebtoken');
const UserModel = require('../model/UserModel');


module.exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized! Invalid Token" });
        }

        const user = await UserModel.findById(decoded.userId); // Fetch user using _id

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        
        req.user = user; // Attach user object to req
        
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};