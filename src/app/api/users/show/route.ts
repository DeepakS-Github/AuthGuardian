import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import extractDataFromAccessToken from "@/helpers/extractDataFromAccessToken";

export async function GET(request: NextRequest) {
    try {
        const response = await extractDataFromAccessToken(request);

        // Check if the response is a NextResponse instance
        if (response instanceof NextResponse) {
          // If it is, return the response directly
          return response;
        }
    
        const user = await User.findById(response);

        if (user.isVerified === false) {
            return NextResponse.json(
                { error: "User is not verified" },
                { status: 400 }
            );
        }

        const users = await User.find({}).select("-password -__v -verificationToken -verificationTokenExpiry -_id");
        // console.log(users);
        return NextResponse.json({ users: users.reverse() }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}