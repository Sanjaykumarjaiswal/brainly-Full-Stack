import { useRef } from "react";
import { Button } from "../component/Button";
import { Input } from "../component/Input";

import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router";


export default function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    async function signup() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            if (!username || !password) {
                alert("Please fill in both username and password");
                return;
            }
            await axios.post(BACKEND_URL+"/api/v1/signup", {
                username,
                password
            });
            localStorage.setItem("username", username);
            alert("You have signed up!");
            navigate('/signin')
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        }
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-200 flex justify-center items-center">
            <div className="bg-white text-gray-500 rounded-xl border min-w-48 flex flex-col p-8 shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Sign Up for Brainlyy</h2>
                <Input reference={usernameRef} placeholder="Username"/>
                <Input reference={passwordRef} placeholder="Password"/>
                <div className="flex justify-center pt-4 rounded-md pb-2">
                    <Button onClick={signup} variant="primary" text="SignUp" size="md" fullWidth={true}/>
                </div>
                <div className="text-center mt-2">
                    <span className="text-gray-400">Already have an account? </span>
                    <a href="/signin" className="text-purple-600 hover:underline">Sign In</a>
                </div>
            </div>
        </div>
    )
}
