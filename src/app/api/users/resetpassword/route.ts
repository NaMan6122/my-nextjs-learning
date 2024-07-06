import {sendResetEmail} from "@/helper/mailer";
import {connect} from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import bcryptjs from "bcryptjs";
import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request : NextRequest){
    try {
            //fetching the data from the frontend:
            const reqBody = await request.json();
            const {email} = reqBody;
            const user = await User.findOne({email: email});
            if(!user){
                return NextResponse.json({error : "User does not exist"}, {status:400});
            }
            const id = user._id;
            //creating token data:
            const tokenData = {
                id: user._id,
                username: user.username,
            }
            //creating the token(signed token using jwt):
            const resetToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET! ,{expiresIn: '1d'});
            
            //sending the email to the user:
            await sendResetEmail({email:email, emailType:"RESET", userId:id, token:resetToken});
            console.log(user);
            console.log("okk");

            return NextResponse.json({message: "Email sent successfully", success: true});


    } catch (error : any) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

