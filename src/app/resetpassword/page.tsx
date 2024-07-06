//we  will use this page to gather the user email and then using a "next" button an email will be sent to the sur for further process.
"use client"
import {useState} from "react"
import axios from "axios"

export default function ResetPassword(){
    const[email, setEmail] = useState("");
    const[loading, setLoading] = useState(false);
    
    const onResetPass = async() =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", {email});
            console.log(response);
            if(response){
                alert("Email sent successfully!");
            }else{
                alert("Error sending email!");
            }
        } catch (error: any) {
            alert("Error sending password reset link! please try again later!")
        } finally{
            setLoading(false);
        }
    };

    return(
        <div className = "flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading..." : "Forgot Password? Let's Reset!"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            
            <br></br>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            />

            <button
            onClick={onResetPass}
            className="p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px
            -4 rounded focus:outline-none focus:shadow-outline"
            >Next</button>
        </div>
    )
}