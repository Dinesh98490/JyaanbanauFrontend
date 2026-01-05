import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_PATHS } from "../common/ImageConstant";
// import api from "../api/api"; // Removed for mock implementation

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  /* const [errors, setErrors] = useState({
    email: "",
    password: "",
    root: "",
  }); */

  // Simplified error state for mock demo
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    root: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear root error on change
    if (errors.root) setErrors(prev => ({ ...prev, root: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      // MOCK LOGIN LOGIC
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock success
        const mockToken = "mock-jwt-token-12345";
        localStorage.setItem("token", mockToken);
        localStorage.setItem("role", "Customer");

        // alert("Login successful!"); // Optional: remove alert for smoother UX
        navigate("/customer/membership");

      } catch (error) {
        console.error("Mock login error:", error);
        setErrors(prev => ({ ...prev, root: "Something went wrong" }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="enter your password"
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 border-2 border-gray-400 rounded"
            />
            Remember me
          </label>
          <Link to="/forgotpassword" className="text-blue-600 underline">
            Forgot Password?
          </Link>
        </div>

        {/* Error Message */}
        {errors.root && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
            <span className="block sm:inline">{errors.root}</span>
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 text-lg disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <div className="text-left pt-2">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline font-medium">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#EFF6FF" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column - Form */}
        <div className="flex items-center justify-center px-6 py-12 lg:px-12">
          <LoginForm />
        </div>

        {/* Right Column - Image */}
        <div
          className="hidden lg:flex flex-col items-start justify-center px-6"
          style={{ backgroundColor: "#EFF6FF" }}
        >
          <img
            src={IMAGE_PATHS.backgroundremovelogo}
            alt="login image"
            className="w-full max-w-lg object-left object-contain -translate-x-5"
          />
        </div>
      </div>
    </main>
  );
}
