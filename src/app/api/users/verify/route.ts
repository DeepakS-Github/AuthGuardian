import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConnect";

dbConnect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        const decodedToken = decodeURIComponent(token);

    
        const user: any = await User.findOne({verificationToken: decodedToken});

        if(!user){
            return NextResponse.json({message: "Invalid Verification Token"}, {status: 203});
        }

        if(user.verificationTokenExpiry < Date.now()){
            return NextResponse.json({message: "Verification Token Expired"}, {status: 201});
        }
    
        user.isVerified = true;
    
        await User.findByIdAndUpdate(user._id, user);
    
        return NextResponse.json({message: "Verification Successfull"}, {status: 200});
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
   

}