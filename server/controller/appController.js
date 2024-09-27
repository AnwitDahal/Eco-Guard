const UserModel = require("../model/UserModel");
const { generateOTP, generateTokenAndSetCookie } = require("../utils/jwtconfiguration");
const { hashPassword } = require("../utils/password");

module.exports.signup = async (req, res) => {
  const { email, password, name, phNumber, address } = req.body;
  try {
    if (!email || !password || !name || !phNumber || !address) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //password hashing
    const hash = await hashPassword(password);

    //generating otp for verification
    const verificationToken = generateOTP();

    const user = new UserModel({
      email,
      password: hash,
      phNumber,
      address,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });

    await user.save();


    //jwt
    generateTokenAndSetCookie(res, user._id);


    res.status(201).json({
      success: true,
      message: "User created succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};