import extractDataFromAccessToken from "@/helpers/extractDataFromAccessToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await extractDataFromAccessToken(request);

    // Check if the response is a NextResponse instance
    if (response instanceof NextResponse) {
      // If it is, return the response directly
      return response;
    }

    return NextResponse.json(
      { message: "Successfully Retrieved Profile Data", data: response },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
