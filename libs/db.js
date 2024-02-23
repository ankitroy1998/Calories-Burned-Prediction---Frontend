import mongoose from 'mongoose';

export const connectToDB = async () => {

    const uri = process.env.MONGODB_URI;

    try{
        uri && await mongoose.connect(uri);
        console.log("Mongodb Connected");
    }catch(error){
        console.log("DB Not Connecting");
        console.log(error);
    }
}