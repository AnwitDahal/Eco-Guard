const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requied: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      require: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phNumber:{
        type:String,
        require:true,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
