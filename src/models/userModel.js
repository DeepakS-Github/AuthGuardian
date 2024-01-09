import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Please provide a name"] 
  },
  email: {
    type: String, 
    unique: true, 
    required: [true, "Please provide an email"],
  },
  password: {
    type: String, 
    required: [true, "Please provide a password"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,   
  verificationToken: String,
  verificationTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
