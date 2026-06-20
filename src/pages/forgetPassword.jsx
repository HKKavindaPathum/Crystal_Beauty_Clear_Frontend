import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ForgetPasswordPage() {
    const [otpSent, setOtpSent] = useState(false)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    function sendOtp() {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp", { email })
            .then(() => {
                setOtpSent(true)
                toast.success("OTP sent! Check your inbox.")
            })
            .catch(() => toast.error("Failed to send OTP"))
    }

    function verifyOtp() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
            email,
            otp: parseInt(otp, 10),
            newPassword,
        })
            .then(() => {
                toast.success("Password reset successfully!")
                navigate("/login")
            })
            .catch(() => toast.error("Invalid OTP"))
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-100/50 dark:from-[#120D0E] dark:via-[#1A1012] dark:to-[#251317] flex justify-center items-center px-4 transition-colors duration-300 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-pink-300/20 dark:bg-pink-900/10 blur-[80px] md:blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent/15 dark:bg-accent/5 blur-[80px] md:blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-white/70 dark:bg-[#1C1416]/75 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40 dark:border-white/5 flex flex-col items-center z-10 transition-all duration-300">
                <h2 className="font-heading text-3xl font-extrabold mb-1 text-secondary dark:text-[var(--color-dark-text)] text-center">
                    {otpSent ? "Reset Password" : "Forgot Password"}
                </h2>
                <p className="font-main text-xs text-gray-500 dark:text-gray-400 mb-8 text-center">
                    {otpSent ? "Verify your identity and set a new password" : "Get back into your BeautyClear account"}
                </p>

                {!otpSent ? (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 mb-6 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition duration-300 font-main"
                        />
                        <button
                            onClick={sendOtp}
                            className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition duration-300 shadow-md cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transform active:scale-[0.98]"
                        >
                            Send OTP
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-6 text-accent hover:text-accent-hover hover:underline font-semibold transition cursor-pointer text-sm"
                        >
                            Back to Login
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-4 mb-4 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition duration-300 font-main"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-4 mb-4 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition duration-300 font-main"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-4 mb-6 rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition duration-300 font-main"
                        />
                        <button
                            onClick={verifyOtp}
                            className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition duration-300 shadow-md cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transform active:scale-[0.98]"
                        >
                            Verify OTP & Reset
                        </button>
                        <button
                            onClick={() => setOtpSent(false)}
                            className="mt-6 w-full py-3 bg-pink-100/50 dark:bg-[#120D0E]/30 text-pink-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-[#120D0E]/60 font-semibold rounded-xl transition duration-300 cursor-pointer text-center text-sm border border-pink-200/50 dark:border-[var(--color-dark-border)]"
                        >
                            Resend OTP
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
