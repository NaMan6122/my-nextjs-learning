"use client"
import axios from "axios";
import Link from "next/link";
import {useState, useEffect} from "react";

export default function VerifyEmailPage(){

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    //function to make an api request call to the verifyemail api.
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);

        } catch (error : any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() =>{
        //const token = new URLSearchParams(window.location.search).get("token");
        const url = window.location.search.split("=");
        setToken(url[1] || ""); //means we are fecthing the second half of the url array so formed after splitting the original url.
    }, [])

    useEffect(() =>{
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-yellow-500 text-black">{token ? `${token}` : "No token"}</h2>

            {/*based on if the user is verified, we display a text to the user.*/}
            {verified && (
                <div className="bg-green-500 p-2 text-black">
                    Email verified!
                    <hr />
                <Link href="/login">Login</Link>
                </div>
            )}
            
            {/*Displaying the error text, if any.*/}
            {error && (
                <div className="bg-red-500 p-2 text-black">Error verifying email</div>
            )}

        </div>
    )
}
