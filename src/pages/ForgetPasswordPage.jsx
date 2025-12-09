import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_PATHS } from "../common/ImageConstant";

export function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    alert("Reset link sent to your email!");
    
    // Redirect to update password page
    navigate("/updatepassword");
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">
        Forget Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 text-lg"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default function ForgetPasswordPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#EFF6FF" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center px-6 py-12 lg:px-12">
          <ForgetPasswordForm />
        </div>

        <div
          className="hidden lg:flex flex-col items-end justify-end min-h-screen pr-12 pb-12"
          style={{ backgroundColor: "#EFF6FF" }}
        >
          <img
            src={IMAGE_PATHS.backgroundremovelogo}
            alt="forget password"
            className="max-w-lg object-contain mb-24 mr-20"
          />
        </div>
      </div>
    </main>
  );
}
