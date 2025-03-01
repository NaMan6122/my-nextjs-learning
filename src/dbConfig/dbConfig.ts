import mongoose from 'mongoose';
export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB connected successfully!");
        })
        connection.on('error', (err) => {
            console.log("MongoDB Connection Error, Please Check MongoDB Again!")
            console.log(err);
            process.exit();
        })
    } catch (error) {
        console.log("Oops, Something Went Wrong!");
        console.log(error);
    }
}
