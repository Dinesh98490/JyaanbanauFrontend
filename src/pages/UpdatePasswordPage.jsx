import { useState } from "react";
import { IMAGE_PATHS } from "../common/ImageConstant";

export function UpdatePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Password Updated Successfully!");
    alert("Your password has been updated!");
    setNewPassword("");
    setConfirmPassword("");
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
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Update Button */}
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
            className="max-w-lg object-contain mb-12 mr-12"
          />
        </div>
      </div>
    </main>
  );
}
