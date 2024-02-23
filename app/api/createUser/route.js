import { connectToDB } from '@/libs/db';
import { NextResponse, NextRequest } from "next/server";
import User from "@/schemas/user"
import bcrypt from "bcrypt"

export async function POST(NextRequest) {
    try{
        await connectToDB();

        const body = await NextRequest.json()
        
        const {full_name, dob, contact_no, email, username, password} = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            full_name,
            dob,
            contact_no,
            email,
            username,
            password: hashedPassword
        })
        console.log("user created");

        return NextResponse.json({message: "User created successfully", user: user}, { status: 200 });
        }
  catch(error){
    console.log("err", error);
    if(error.message.includes("duplicate")){
        return NextResponse.json({message: "User Already Exists"}, { status: 400 });
    }
    return NextResponse.json({message: error}, { status: 500 });
  }
}