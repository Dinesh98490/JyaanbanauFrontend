import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGE_PATHS } from "../common/ImageConstant";

export function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

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
    console.log("Reset link sent to:", email);
    alert("Reset link sent to your email!");
    setEmail("");
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
            name="email"
            value={email}
            placeholder="enter your email"
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Send Reset Link Button */}
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
          {/* Left Column - Form */}
          <div className="flex items-center justify-center px-6 py-12 lg:px-12">
            <ForgetPasswordForm />
          </div>
  
          {/* Right Column - Image */}
          <div
            className="hidden lg:flex flex-col items-start justify-start px-6 pt-6"
            style={{ backgroundColor: "#EFF6FF" }}
          >
            <img
              src={IMAGE_PATHS.backgroundremovelogo}
              alt="forget password"
              className="w-full max-w-lg object-left object-contain -translate-x-5"
            />
          </div>
        </div>
      </main>
    );
  }