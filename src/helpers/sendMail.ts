import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConnect";

dbConnect();

interface UserBody {
  save(): unknown;
  _id: string; 
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: string; 
  __v: number;
  verificationToken: string;
  verificationTokenExpiry: Date; 
}

export async function sendVerificationMail(
  emailId: string,
  userId: string
) {
  const salt = await bcryptjs.genSalt(10);
  const verificationToken = await bcryptjs.hash(userId, salt);

  const user: UserBody | null = await User.findById(userId);

  if(user){
    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();
  }

  let config = {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  const encodedToken = encodeURIComponent(verificationToken);

  let message = {
    from: "auth@guardian.com",
    to: emailId,
    subject: "Account Verification from AuthGuardian",
    html: `<a href='http://localhost:3000/verify/${encodedToken}'>Click here</a> to verify your AuthGuardian account.`,
  };

  const mailResp = await transporter.sendMail(message);
  console.log(mailResp);
}
