// import Mailgen from "mailgen";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConnect";

dbConnect();

export async function sendVerificationMail(
  emailId: string,
  name: string,
  userId: string
) {
  const salt = await bcryptjs.genSalt(10);
  const verificationToken = await bcryptjs.hash(userId, salt);

  const user: any = await User.findById(userId);
  user.verificationToken = verificationToken;
  user.verificationTokenExpiry = Date.now() + 3600000;

  await user.save();

  let config = {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  // let MailGenerator = new Mailgen({
  //   theme: "default",
  //   product: {
  //     name: "AuthGuardian",
  //     link: "https://mailgen.js/",
  //   },
  // });

  // let response = {
  //   body: {
  //     name: name,
  //     intro: "Verify your account",
  //     action: {
  //       instructions: "To verify your account, click the link below:",
  //       button: {
  //         color: "#22BC66", // Customize the button color if needed
  //         text: "Verify",
  //         link: `http://localhost:3000/profile/${verificationToken}`,
  //       },
  //     },
  //     outro: "Looking forward to secure your account.",
  //   },
  // };

  // let mail = MailGenerator.generate(response);

  const encodedToken = encodeURIComponent(verificationToken);

  let message = {
    from: "gogan@gmail.com",
    to: emailId,
    subject: "Account Verification from AuthGuardian",
    html: `<a href='http://localhost:3000/verify/${encodedToken}'>Click here</a> to verify your AuthGuardian account.`,
  };

  const mailResp = await transporter.sendMail(message);
  console.log(mailResp);
}
