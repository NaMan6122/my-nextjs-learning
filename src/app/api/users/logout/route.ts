//logout requires clearing out the cookies of the loggedin user.
import {NextResponse} from "next/server";

export async function GET(){ //no parameters as anyone can call the get method.
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        })
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)}); //resetting the cookies of the user.
        return response;
    } catch (error: any) {
        return NextResponse.json({error: "Something went wrong!"}, {status: 400});
    }
}