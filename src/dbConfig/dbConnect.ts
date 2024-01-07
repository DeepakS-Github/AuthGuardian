import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("DB connected");
        })

        connection.on('error', (error)=>{
            console.log("Error in DB connection");
            console.log(error);
        })

    } catch (error) {
        console.log("Something went wrong with DB connection");
        console.log(error);
    }

}