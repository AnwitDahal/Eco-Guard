const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
const OrganizationModel = require('../model/OrganizationModel');

module.exports.verifyTokenForUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid Token" });
        }

        const user = await UserModel.findById(decoded.userId); // Fetch user using _id
        const organization = await OrganizationModel.findById(decoded.organizationId); // Fetch organization using organizationId

        if (!user && !organization) {
            return res.status(404).json({ success: false, message: "User and Organization not found" });
        }

        // Attach user and organization objects to req
        req.user = user;
        req.organization = organization;

        // Optionally, set flags to indicate if user and organization were found
        req.userFound = !!user;
        req.orgFound = !!organization;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log("Error in verifyTokenForUser", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};