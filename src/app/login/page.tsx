"use client"
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){ //method for the functioning of the signup page.
    const router = useRouter(); 
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false); //create a button
    const [loading, setLoading] = React.useState(false); //create a loading using react.

    const onLogin = async () => { //method for talking to the database.
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            if(response){
                alert("Login Successful!!!");
            }
            console.log("Login Successfull!", response.data);
            toast.success("Login Successfull!");
            router.push("/profile");

        } catch (error: any) {
            alert("Login Failed! Invalid email or password!!");
            console.log("login failed", error.message);
            toast.error = error.message;
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => { //useEffect to control the visiblity of the button.
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])

    return ( //usage of tailwind css.
        <div className = "flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing...." : "Login"}</h1>
            <hr />
            <label htmlFor = "email">email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={user.email}
            onChange = {(e) => setUser({...user, email: e.target.value})}
            placeholder= "email"
            />

            <label htmlFor = "password">password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange = {(e) => setUser({...user, password: e.target.value})}
            placeholder= "password"
            />

            <Link href="/resetpassword">forgot password?</Link>
            <br></br>
            <button
            onClick = {onLogin}
            className="p-2 border border-fray-300 rounded-lg mb-4 focus: outline-none focus border-gray-600">{buttonDisabled ? "Please Fill All Fields" : "Login"}</button>
            <Link href="/signup">New here? Lets Signup</Link>
        </div>
    )
}