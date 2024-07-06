import nodemailer from "nodemailer";
import User from "@/model/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async({email, emailType, userId} : any) => {
    try {
        //create a hashed token using the userId.
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        
        if(emailType === "VERIFY"){
            //send email to verify email address, and update the database with these token values.
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        }

        //creating an object of the nodemailer module.
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "dd977f705f28c2",
              pass: "51a6914893ea6b"
            }
        });

        //constructing the mail.
        const mailOptions = {
            from: "noreply@myapp.com",
            to: email,
            subject: "Verify your email",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
            to "verify your email"</p>`
        }

        const mailResponse = transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error : any) {
        throw new Error(error.message);
    }
}

export const sendResetEmail = async({email, emailType, userId, token} : any) => {
    try {
        if(emailType === "RESET"){
            //send email to reset password, and update the database with these token values.
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        //creating an object of the nodemailer module.
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "dd977f705f28c2",
              pass: "51a6914893ea6b"
            }
        });

        //constructing the mail.
        const mailOptions = {
            from: "noreply@myapp.com",
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/changepassword?token=${token}">here</a>
            to "reset your password"</p>`
        }

        const mailResponse = transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error : any) {
        throw new Error(error.message);
    }
}