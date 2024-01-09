import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import extractDataFromAccessToken from "@/helpers/extractDataFromAccessToken";
import User from "@/models/userModel";
import { sendVerificationMail } from "@/helpers/sendMail";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const response = await extractDataFromAccessToken(request);

    if (response instanceof NextResponse) {
      // If it is, return the response directly
      return response;
    }

    const user: any = await User.findById(response);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
      await sendVerificationMail(user.email, user.name, user._id.toString());
      return NextResponse.json(
        { message: "Mail sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Error sending mail" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}