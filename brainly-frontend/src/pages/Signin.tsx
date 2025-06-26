import { useRef, useState } from "react";
import { Button } from "../component/Button";
import { Input } from "../component/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router";

export default function SignIn() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    async function signin(){
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        setLoading(true);
        try {
            const response = await axios.post(BACKEND_URL+"/api/v1/signin",{
                username,
                password
            }) 
            const jwt = response.data.token
            localStorage.setItem("token",jwt)
            localStorage.setItem("username", username || "");
            navigate("/dashboard")
        } catch (e: any) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message);
            } else {
                alert("Sign in failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }
    return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-200 flex justify-center items-center">
        <div className="bg-white text-gray-500 rounded-xl border min-w-48 flex flex-col p-8 shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Sign In to Brainlyy</h2>
            <Input reference={usernameRef} placeholder={"Username"}/>
            <Input reference={passwordRef} placeholder={"Password"} type="password"/>
            <div className="flex justify-center pt-4 rounde-md pb-2">
                <Button onClick={signin} variant="primary" text={loading ? "Signing In..." : "SignIn"} size="md" fullWidth={true} />
            </div>
            <div className="text-center mt-2">
                <span className="text-gray-400">Don't have an account? </span>
                <a href="/signup" className="text-purple-600 hover:underline">Sign Up</a>
            </div>
        </div>
    </div>
    )
}
