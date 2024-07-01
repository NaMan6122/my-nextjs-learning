"use client"
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){ //method for the functioning of the signup page.
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false); //creating a button
    const [loading, setLoading] = React.useState(false); //creating a loading setup.

    const onSignUp = async () => { //method for talking to the database.
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data);
            router.push("/login"); //after successful signup, this router redirects the user to the login page.

        } catch (error: any) {
            console.log("Signup Failed", error.message);
            toast.error = error.message;
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user]);

    return ( //usage of tailwind css.
        <div className = "flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing":"Sign Up"}</h1>
            <hr />
            <label htmlFor = "username">username</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange = {(e) => setUser({...user, username: e.target.value})}
            placeholder= "username"
            />

            <label htmlFor = "email">email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange = {(e) => setUser({...user, email: e.target.value})}
            placeholder= "email"
            />

            <label htmlFor = "password">password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="text"
            value={user.password}
            onChange = {(e) => setUser({...user, password: e.target.value})}
            placeholder= "password"
            />

            <button
            onClick = {onSignUp}
            className="p-2 border border-fray-300 rounded-lg mb-4 focus: outline-none focus border-gray-600">{buttonDisabled ? "Please Fill Up All Fields" : "Sign Up"}</button>
            <Link href="/login">Already a user? Login Here</Link>
        </div>
    )
}