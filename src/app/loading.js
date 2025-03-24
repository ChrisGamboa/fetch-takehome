function SuspensedLoginForm() {
    return (
        <form>
            <fieldset className="fieldset w-xs sm:w-sm md:w-md lg:w-lg bg-base-200 border border-base-300 p-4 rounded-box">
                <div className="flex justify-center items-center">
                    <span className="loading loading-spinner text-primary"></span>
                </div>
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
            <SuspensedLoginForm />
        </div>
    );
}
