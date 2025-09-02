
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [signupLoading, setSignupLoading] = useState(false);
    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupLoading(true);
        setMessage("");
        try {
            const formData = new FormData();
            formData.append("username", signupUsername);
            formData.append("password", signupPassword);
            const res = await fetch("https://yafe3on.com/backend/api/user/signup.php", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setMessage("تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن");
                setShowSignupForm(false);
                setShowLoginForm(true);
                setSignupUsername("");
                setSignupPassword("");
            } else {
                setMessage(data.message || "فشل إنشاء الحساب");
            }
        } catch (err) {
            setMessage("حدث خطأ في الاتصال بالخادم");
        }
        setSignupLoading(false);
    };
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            const res = await fetch("https://yafe3on.com/backend/api/user/login.php", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setMessage("تم تسجيل الدخول بنجاح");
                localStorage.setItem("userID", data.user_id);
                navigate("/admin")
                // يمكنك هنا إعادة التوجيه أو حفظ بيانات المستخدم
            } else {
                setMessage(data.message || "فشل تسجيل الدخول");
            }
        } catch (err) {
            setMessage("حدث خطأ في الاتصال بالخادم");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#091057] to-[#024CAA]">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-[350px] max-w-full">
                <h2 className="text-2xl font-bold text-[#024CAA] mb-8">مرحباً بك في منصة نسك</h2>
                {!showLoginForm && !showSignupForm ? (
                    <>
                        <button
                            className="w-full mb-4 py-3 rounded-lg bg-[#FBC134] text-white font-bold text-lg shadow hover:bg-[#e0a800] transition"
                            onClick={() => { setShowLoginForm(true); setMessage(""); }}
                        >
                            تسجيل دخول
                        </button>
                        <button
                            className="w-full py-3 rounded-lg bg-[#024CAA] text-white font-bold text-lg shadow hover:bg-[#022e6b] transition"
                            onClick={() => { setShowSignupForm(true); setMessage(""); }}
                        >
                            تسجيل جديد
                        </button>
                    </>
                ) : null}
                {showLoginForm && !showSignupForm && (
                    <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#FBC134] text-white py-2 rounded hover:bg-[#e0a800] transition-all duration-200 font-bold"
                            disabled={loading}
                        >
                            {loading ? "...جاري الدخول" : "دخول"}
                        </button>
                        <button
                            type="button"
                            className="w-full mt-2 bg-gray-200 text-[#024CAA] py-2 rounded font-bold hover:bg-gray-300"
                            onClick={() => { setShowLoginForm(false); setMessage(""); }}
                        >
                            رجوع
                        </button>
                    </form>
                )}
                {showSignupForm && (
                    <form onSubmit={handleSignup} className="w-full flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="اسم المستخدم الجديد"
                            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                            value={signupUsername}
                            onChange={e => setSignupUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="كلمة المرور الجديدة"
                            className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                            value={signupPassword}
                            onChange={e => setSignupPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#024CAA] text-white py-2 rounded hover:bg-[#022e6b] transition-all duration-200 font-bold"
                            disabled={signupLoading}
                        >
                            {signupLoading ? "...جاري التسجيل" : "تسجيل"}
                        </button>
                        <button
                            type="button"
                            className="w-full mt-2 bg-gray-200 text-[#024CAA] py-2 rounded font-bold hover:bg-gray-300"
                            onClick={() => { setShowSignupForm(false); setMessage(""); }}
                        >
                            رجوع
                        </button>
                    </form>
                )}
                {message && (
                    <div className="mt-4 text-center text-red-600 font-semibold">{message}</div>
                )}
            </div>
        </div>
    );
}

export default Login;
