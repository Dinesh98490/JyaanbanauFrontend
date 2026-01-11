import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IMAGE_PATHS } from "../common/ImageConstant";
import api from "../api/api"; // Import api

export function UpdatePasswordForm() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (!token) {
          toast.error("Invalid or missing token.");
          return;
        }

        const response = await api.post("/users/reset-password", {
          token,
          password: formData.password
        });

        if (response.data.success || response.status === 200) {
          toast.success("Password updated successfully!");
          navigate("/login");
        }

      } catch (error) {
        console.error(error);
        const msg = error.response?.data?.message || "Failed to reset password";
        toast.error(msg);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">
        Update Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            New Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 text-lg"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default function UpdatePasswordPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#EFF6FF" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* Left Column */}
        <div className="flex items-center justify-center px-6 py-12 lg:px-12">
          <UpdatePasswordForm />
        </div>

        {/* Right Column - Image with same 2-3cm adjustment */}
        <div
          className="hidden lg:flex flex-col items-end justify-end min-h-screen pr-12 pb-12"
          style={{ backgroundColor: "#EFF6FF" }}
        >
          <img
            src={IMAGE_PATHS.backgroundremovelogo}
            alt="update password"
            className="max-w-lg object-contain mb-16 mr-16"
          />
        </div>
      </div>
    </main>
  );
}
