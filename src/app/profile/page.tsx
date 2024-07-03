"use client";

import axios from "axios";
import {useRouter} from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {useState} from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login"); //redirecting the user back to the login page after the logout.

        } catch (error : any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async() => {
        try {
            const response = await axios.get("api/users/me");
            console.log(response.data);
            setData(response.data.data._id);

        } catch (error : any) {
            console.log(error.message);
            toast.error(error.message);
            
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>My Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-2 bg-orange-400 mt-2 rounded-lg hover:bg-blue-700 text-white font_bold py-2 px-4">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
            onClick={logout}
            className="bg-blue-500 mt-2 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
            >Logout</button>

            <button
            onClick={getUserDetails}
            className="bg-yellow-500 mt-2 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
            >Details</button>
        </div>
    )
}