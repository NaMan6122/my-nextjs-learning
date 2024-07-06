"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ChangePassword(){
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const router = useRouter();

    useEffect(() =>{
        //const token = new URLSearchParams(window.location.search).get("token");
        const url = window.location.search.split("=");
        setToken(url[1] || "");
    }, [])

    const onChangePass = async()=>{
        if(newPassword != confirmPassword){
            alert("New Password and Confirm Password are not same");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("/api/users/changepassword",{password, newPassword, token});
            console.log(response);
            if(response){
                alert("Password changed successfully!!");
                router.push("/login");
            }
        } catch (error:any) {
            alert("Operation Failed, Please try again later")
            console.log(error.response.data);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ?  "Loading..." : "Change Password"}</h1>
            <br></br>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <br></br>

            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password"
            placeholder="New Password"  
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            />
            <br></br>

            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />

            <button
            onClick = {onChangePass}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            >Change Password</button>

        </div>
    )
}
