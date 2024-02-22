import { NextResponse, NextRequest } from "next/server";

export async function POST(NextRequest) {
    try{
        const data = await NextRequest.json()
        //Hit Predict APi
        const response = await fetch('https://calorieburnedmodel.onrender.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log(result)
        return NextResponse.json(result)
    }
    catch(err){
        console.log(err)
    }
}