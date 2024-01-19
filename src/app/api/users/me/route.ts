import extractDataFromAccessToken from "@/helpers/extractDataFromAccessToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    const response = await extractDataFromAccessToken(request);

    // Check if the response is a NextResponse instance
    if (response instanceof NextResponse) {
      // If it is, return the response directly
      return response;
    }

    const user = await User.findById(response).select(
      "-password -__v -verificationToken -verificationTokenExpiry -_id"
    );
    console.log(user);

    return NextResponse.json(
      { message: "Successfully Retrieved Profile Data", profile: user },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userIdResponse = await extractDataFromAccessToken(request);

    // Check if the response is a NextResponse instance
    if (userIdResponse instanceof NextResponse) {
      // If it is, return the response directly
      return userIdResponse;
    }

    await User.findByIdAndDelete(userIdResponse);

    const response = NextResponse.json(
      { message: "Account successfully deleted" },
      { status: 200 }
    );
    response.cookies.set("auth-token", "", { httpOnly: true });
    return response;
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
