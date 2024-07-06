import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        // Fetching the data from the frontend entered by the user, by axios call.
        const reqBody = await request.json();
        const {password, newPassword, token } = reqBody;

        // Checking if the token is valid or not.
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        const userId = decodedToken.id;

        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        // Check for the genuineness of the old password.
        console.log(password);
        console.log(user.password);
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            console.log("Old password is not correct");
            return NextResponse.json({ message: "Incorrect Old Password" }, { status: 400 });
        }

        // Encrypting the new password.
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);
        user.password = hashedPassword;

        // Flush the tokens so that the password can only be changed one time using a link.
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password Changed Successfully", success: true });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong! Try again later!" }, { status: 500 });
    }
}
