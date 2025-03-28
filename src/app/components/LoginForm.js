"use client"

import { useState } from "react";
import LoginButton from "./LoginButton";

export function LoginForm() {
    const [loginData, setLoginData] = useState({ name: "", email: "" });

    async function handleInputChange(event) {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }


    return (
        <form>
            <fieldset className="fieldset w-xs sm:w-sm md:w-md lg:w-lg bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">Login</legend>

                <label className="fieldset-label text-xs sm:text-xs md:text-sm lg:text-md ">Name</label>
                <input onChange={handleInputChange} name="name" pattern="[A-Za-z][A-Za-z\-]*" minLength="2" maxLength="30" type="text" className="input input-xs sm:input-sm md:input-md md:w-md lg:input-lg validator" placeholder="What's your name?" required />

                <label className="fieldset-label text-xs sm:text-xs md:text-sm lg:text-md">Email</label>
                <input onChange={handleInputChange} name="email" type="email" className="input input-xs sm:input-sm md:input-md md:w-md lg:input-lg validator" placeholder="What's your e-mail?" required />

                {/* {loading ? <LoadingIndicator /> : <button type="submit" className={`btn sm:btn-sm md:btn-md lg:btn-lg ${success ? `btn-success` : `btn-primary`} mt-4`}>{success ? "Success!" : "Login"}</button>} */}
                <div className="flex justify-center">
                    <LoginButton loginData={loginData} />
                </div>
            </fieldset>
        </form>
    )
}