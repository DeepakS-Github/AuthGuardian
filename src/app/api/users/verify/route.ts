import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConnect";
import extractDataFromAccessToken from "@/helpers/extractDataFromAccessToken";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const decodedToken = decodeURIComponent(token);

    const user: any = await User.findOne({ verificationToken: decodedToken });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Verification Token", isVerified: false },
        { status: 403 }
      );
    }

    if (user.verificationTokenExpiry < Date.now()) {
      return NextResponse.json(
        { message: "Verification Token Expired", isVerified: false },
        { status: 401 }
      );
    }

    user.isVerified = true;

    await User.findByIdAndUpdate(user._id, user);

    return NextResponse.json(
      { message: "Verification Successful", isVerified: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



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

    return NextResponse.json(
      {
        message: "User verification status found",
        isVerified: user.isVerified,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
