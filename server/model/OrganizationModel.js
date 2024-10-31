const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema(
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
    district: {
      type: String,
      require: true,
    },
    AdminVerified: {
      type: Boolean,
      default: false,
    },
    phNumber: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    regNum: {
      type: String,
      require: true,
    },
    Certiimage: {
      type: String,
      require:true,
    },
    WorkImage:{
      type:String,
    },
    points:{
      type:Number
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("org", orgSchema);
