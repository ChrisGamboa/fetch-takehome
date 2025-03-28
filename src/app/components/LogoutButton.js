import Link from "next/link";

async function logout() {
    await fetch("https://frontend-take-home-service.fetch.com/auth/logout",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }
    )
}

export default function LogOutButton() {
    return (
        <div className="navbar-end">
            <Link href="/" onClick={logout} className="btn bg-neutral-content">Logout</Link>
        </div>
    )
}