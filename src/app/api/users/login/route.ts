import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User does not exist");
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // check if the password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Password is incorrect");
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    // create a token and send it to the user
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const token = jwt.sign(tokenData, process.env.JWT_TOKEN!, {
      expiresIn: "1m",
    });

    const response = NextResponse.json(
      { message: "User logged in successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("auth-token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
