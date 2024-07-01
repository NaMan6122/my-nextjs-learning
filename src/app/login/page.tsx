"use client"
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function LoginPage(){ //method for teh functioning of the signup page.
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => { //method for talking to the database.

    }

    return ( //usage of tailwind css.
        <div className = "flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />
            <label htmlFor = "email">email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email"
            type="text"
            value={user.email}
            onChange = {(e) => setUser({...user, email: e.target.value})}
            placeholder= "email"
            />

            <label htmlFor = "password">password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            type="text"
            value={user.password}
            onChange = {(e) => setUser({...user, password: e.target.value})}
            placeholder= "password"
            />

            <button
            onClick = {onLogin}
            className="p-2 border border-fray-300 rounded-lg mb-4 focus: outline-none focus border-gray-600">Login</button>
            <Link href="/signup">New here? Lets Signup</Link>
        </div>
    )
}