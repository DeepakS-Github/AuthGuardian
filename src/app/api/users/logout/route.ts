import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "User logged out successfully", success: true },
      { status: 200 }
    );
    response.cookies.set("auth-token", "", { httpOnly: true });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
