"use server"
// import fetchCookie from "fetch-cookie";
import { cookies } from "next/headers";


// export async function setCookieAction(setCookieHeader) {
//     if (setCookieHeader) {
//         const c = await cookies();
//         for( const cookie of setCookieHeader) {
//             // Extract cookie name and value from the Set-Cookie header
//             const [cookieString] = cookie.split(';');
//             const [cookieName, cookieValue] = cookieString.split('=');

//             // Set the cookie using the extracted name and value
//             c.set(cookieName, cookieValue);
//         };
//         console.log("Set cookies: ", c);
//     }
// }

export async function login(name, email) {
    try {
        const loginResponse = await fetch("https://frontend-take-home-service.fetch.com/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
                credentials: "include"
            }
        )

        if (!loginResponse.ok) {
            throw new Error(`Response status: ${loginResponse.status}`);
        }

        // console.log("/login setCookieHeader: ", loginResponse.headers.getSetCookie());
        // await setCookieAction(loginResponse.headers.getSetCookie())


    } catch (error) {
        console.error("Error logging in:\n", error);
        return false;
    }
}

export async function getBreeds() {
    // const allCookies = await cookies();
    // console.log("Cookies in /search: ", allCookies)
    try {
        const breeds = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        )

        if (!breeds.ok) {
            throw new Error(`Response status: ${breeds.status}`)
        }

    } catch (error) {
        console.error("Error fetching breeds: ", error)
    }
    return await breeds.JSON();
}