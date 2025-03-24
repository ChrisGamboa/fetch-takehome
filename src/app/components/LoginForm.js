"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingIndicator } from "@/components/LoadingIndicator";

export function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    async function submitLogin(event) {
        event.preventDefault();
        setLoading(true);
        
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const name = formData.get('name');

        // const authenticated = login(name, email)
        try {
            const loginResponse = await fetch("https://frontend-take-home-service.fetch.com/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": "true"
                    },
                    body: JSON.stringify({ name, email }),
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
        <form onSubmit={submitLogin}>
            <fieldset className="fieldset w-xs sm:w-sm md:w-md lg:w-lg bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">Login</legend>

                <label className="fieldset-label text-xs sm:text-xs md:text-sm lg:text-md ">Name</label>
                <input name="name" pattern="[A-Za-z][A-Za-z\-]*" minLength="2" maxLength="30" type="text" className="input input-xs sm:input-sm md:input-md md:w-md lg:input-lg validator" placeholder="What's your name?" required />

                <label className="fieldset-label text-xs sm:text-xs md:text-sm lg:text-md">Email</label>
                <input name="email" type="email" className="input input-xs sm:input-sm md:input-md md:w-md lg:input-lg validator" placeholder="What's your e-mail?" required />

                {loading ? <LoadingIndicator /> : <button type="submit" className={`btn sm:btn-sm md:btn-md lg:btn-lg ${success ? `btn-success` : `btn-primary`} mt-4`}>{success ? "Success!" : "Login"}</button>}
            </fieldset>
        </form>
    )
}