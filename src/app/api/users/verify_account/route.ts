import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import extractDataFromAccessToken from "@/helpers/extractDataFromAccessToken";
import User from "@/models/userModel";
import { sendVerificationMail } from "@/helpers/sendMail";

dbConnect();

interface UserBody {
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

export async function GET(request: NextRequest) {
  try {
    const response = await extractDataFromAccessToken(request);

    if (response instanceof NextResponse) {
      // If it is, return the response directly
      return response;
    }

    const user: UserBody | null = await User.findById(response);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
      await sendVerificationMail(user.email, user._id.toString());
      return NextResponse.json(
        { message: "Check your mail" },
        { status: 200 }
      );
    } catch (error) {
      // console.log(error);
      return NextResponse.json(
        { error: "Error sending mail" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
