'use client'
import { useState } from 'react';


function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center">
      <span className="loading loading-spinner text-primary alig"></span>
    </div>
  )
}

function LoginForm() {
  const [loading, setLoading] = useState(false);

  async function submitLogin(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const name = formData.get('name');

    try {

      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_ENDPOINT}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if(!loginResponse.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      console.log("Login response: ", loginResponse);
      
    } catch (error) {
      console.error(error)
    }


    setLoading(false);
  }

  return (
    <form onSubmit={submitLogin}>
      <fieldset className="fieldset w-xs sm:w-sm md:w-md lg:w-lg bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">Login</legend>

        <label className="fieldset-label text-xs sm:text-xs md:text-sm lg:text-md ">Name</label>
        <input name="name" type="text" className="input input-xs sm:input-sm md:input-md md:w-md lg:input-lg" placeholder="What's your name?" required />

        <label className="fieldset-label text-xs sm:text-xs md:text-sm lg:text-md">Email</label>
        <input name="email" type="email" className="input input-xs sm:input-sm md:input-md md:w-md lg:input-lg" placeholder="What's your e-mail?" required />

        {loading ? <LoadingIndicator /> : <button type="submit" className="btn sm:btn-sm md:btn-md lg:btn-lg btn-primary mt-4">Login</button>}
      </fieldset>
    </form>
  )
}

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="hero-content text-center">
        <h1 className="text-5xl font-bold">Fetch</h1>
      </div>
      <div>
        <p></p>
      </div>
      <LoginForm />
    </div>
  );
}
