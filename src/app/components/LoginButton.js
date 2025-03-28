import { useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { useRouter } from "next/navigation";


export default function LoginButton({ loginData }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    async function login() {
        setLoading(true);
    
        try {

            const loginResponse = await fetch("https://frontend-take-home-service.fetch.com/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": "true"
                    },
                    body: JSON.stringify({
                        name: loginData.name,
                        email: loginData.email
                    }),
                    credentials: "include"
                }
            )

            if (!loginResponse.ok) {
                throw new Error(`Response status: ${loginResponse.status}`);
            } else {
                setSuccess(true);
                router.push("/search")
            }

        } catch (error) {
            console.error("Error logging in:\n", error);
            return false;
        }

        setLoading(false);
    }

    return (
        <div>
            {loading ? <LoadingIndicator /> : <button href="/search" onClick={login} className={`btn sm:btn-sm md:btn-md lg:btn-lg ${success ? `btn-success` : `btn-primary`} mt-4`}>{success ? "Success!" : "Login"}</button>}
        </div>)
}