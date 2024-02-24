import { connectToDB } from '@/libs/db';
import { NextResponse, NextRequest } from "next/server";
import User from "@/schemas/user"


export async function POST(NextRequest) {
    try{
        await connectToDB();
    
        const { username } = await NextRequest.json();

        const user = await User.findOne({
            username
        })
        if(!user){
            return NextResponse.json({message: "User Doesn't Exists"}, { status: 400 });
        }
            return NextResponse.json({message: "User Data from GetUser", user: user}, { status: 200 });
    }catch(error){
        return NextResponse.json({message: error}, { status: 500 });
  }
}