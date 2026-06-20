import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleRegister() {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                firstName,
                lastName,
                email,
                password
            })
            toast.success("Registration Successful")
            navigate("/login")
        } catch (e) {
            toast.error(e.response?.data?.message || "Registration Failed")
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-100/50 dark:from-[#120D0E] dark:via-[#1A1012] dark:to-[#251317] flex justify-center items-center px-4 transition-colors duration-300 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-pink-300/20 dark:bg-pink-900/10 blur-[80px] md:blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent/15 dark:bg-accent/5 blur-[80px] md:blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-white/70 dark:bg-[#1C1416]/75 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40 dark:border-white/5 flex flex-col items-center z-10 transition-all duration-300">
                <h2 className="font-heading text-3xl font-extrabold mb-1 text-secondary dark:text-[var(--color-dark-text)] text-center">Create an Account</h2>
                <p className="font-main text-xs text-gray-500 dark:text-gray-400 mb-8 text-center">Join BeautyClear for a personalized luxury experience</p>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-4 mb-4 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition duration-300 font-main"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-4 mb-4 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition duration-300 font-main"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 mb-4 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition duration-300 font-main"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 mb-6 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition duration-300 font-main"
                />

                <button
                    onClick={handleRegister}
                    className="w-full py-4 mb-6 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition duration-300 shadow-md cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transform active:scale-[0.98]"
                >
                    Register
                </button>

                <div className="w-full flex justify-center text-sm mb-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-accent hover:text-accent-hover hover:underline font-semibold transition cursor-pointer"
                    >
                        Already have an account? Login
                    </button>
                </div>

                {/* Continue as Guest */}
                <button
                    onClick={() => navigate("/")}
                    className="w-full py-3 bg-pink-100/50 dark:bg-[#120D0E]/30 text-pink-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-[#120D0E]/60 font-semibold rounded-xl transition duration-300 cursor-pointer text-center text-sm border border-pink-200/50 dark:border-[var(--color-dark-border)]"
                >
                    Continue as Guest
                </button>
            </div>
        </div>
    )
}
