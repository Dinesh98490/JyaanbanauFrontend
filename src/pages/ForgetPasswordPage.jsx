import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IMAGE_PATHS } from "../common/ImageConstant";
import api from "../api/api";

export function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      // Call backend
      const response = await api.post("/users/forgot-password", { email });

      if (response.data.success || response.status === 200) {
        if (response.data.mockData?.resetUrl) {
          toast.info("DEV MODE: Auto-redirecting to Reset Page...");
          // Wait a brief moment so user sees the toast, then redirect
          setTimeout(() => {
            window.location.href = response.data.mockData.resetUrl;
          }, 1500);
        } else {
          toast.success(response.data.message || "Reset link sent!");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Reset Link"}
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
