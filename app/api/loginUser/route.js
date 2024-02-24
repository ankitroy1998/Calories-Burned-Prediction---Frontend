import { connectToDB } from '@/libs/db';
import { NextResponse, NextRequest } from "next/server";
import User from "@/schemas/user"
import bcrypt from "bcrypt"


export async function POST(NextRequest) {
    try{
        await connectToDB();
        const body = await NextRequest.json()

        const {username, password} = body;

        const user = await User.findOne({
            username
        })

        if(!user){
            return NextResponse.json({message: "User Doesn't Exists"}, { status: 400 });
        }  
        //Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({message: "Invalid Credentials"}, { status: 400 });
        }
                return NextResponse.json({message: "User Found Successfully", user: user}, { status: 200 });
        }
  catch(error){
    return NextResponse.json({message: error}, { status: 500 });
  }
}