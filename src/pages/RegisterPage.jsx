import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGE_PATHS } from "../common/ImageConstant";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("Please accept the Terms and Conditions");
      return;
    }
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Registration successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
        acceptTerms: false,
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">
        Register
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Username<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
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
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Password Field */}

        <label className="block text-sm font-medium text-gray-900 mb-2">
          Confirm Password<span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 text-lg"
        >
          Register
        </button>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="w-5 h-5 border-2 border-gray-400 rounded cursor-pointer"
          />
          <label className="text-sm text-gray-700 cursor-pointer">
            Accept all the Terms and Conditions.
          </label>
        </div>

     

        <div className="text-left pt-2">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#EFF6FF" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column - Form */}
        <div className="flex items-center justify-center px-6 py-12 lg:px-12">
          <RegisterForm />
        </div>

        {/* Right Column - Branding with Image */}
        <div
          className="hidden lg:flex flex-col items-start justify-center px-6"
          style={{ backgroundColor: "#EFF6FF" }}
        >
          <img
            src={IMAGE_PATHS.backgroundremovelogo}
            alt="jyaanbanau"
            className="w-full max-w-lg object-left object-contain -translate-x-5"
          />
        </div>
      </div>
    </main>
  );
}
