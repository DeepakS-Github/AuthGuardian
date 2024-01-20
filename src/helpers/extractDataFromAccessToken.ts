import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const extractDataFromAccessToken = async (request: NextRequest) => {
  try {
    const authToken = request.cookies.get("auth-token")?.value || "";

    // Verify and decode the token
    const decodedData: JwtPayload = jwt.verify(authToken, process.env.JWT_TOKEN!) as JwtPayload;

    return decodedData.id;
  } catch (error: any) {
    // console.log(error.name);
    if (error.name === "TokenExpiredError") {
      const expiredTokenResponse = NextResponse.json(
        { error: "Auth token expired" },
        { status: 401 }
      );

      // Delete the "auth-token" cookie in the response
      expiredTokenResponse.cookies.delete("auth-token");

      // Return the modified response
      return expiredTokenResponse;
    } else {
      return NextResponse.json(
        { error: "Invalid auth token" },
        { status: 401 }
      );
    }
  }
};

export default extractDataFromAccessToken;
