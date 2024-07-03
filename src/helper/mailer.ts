import nodemailer from "nodemailer";
import User from "@/model/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async({email, emailType, userId} : any) => {
    try {
        //create a hashed tokes using the userId.
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        
        if(emailType === "VERIFY"){
            //send email to verify email address, and update the database with these token values.
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        }else if(emailType === "RESET"){
            //send email to reset password, and update the database with these token values.
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "dd977f705f28c2",
              pass: "51a6914893ea6b"
            }
        });
        const mailOptions = {
            from: "noreply@myapp.com",
            to: email,
            subject: emailType === "VERIFY" ?  "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
            to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        const mailResponse = transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error : any) {
        throw new Error(error.message);
    }
}