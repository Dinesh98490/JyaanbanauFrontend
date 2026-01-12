import { useState, useEffect } from "react"
import {
  Share2,
  Pencil,
  Camera,
  User,
  Download,
  Heart,
  Bell,
  LogOut,
  Save,
  X
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export default function Profile() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg")
  const [userInfo, setUserInfo] = useState({ username: "", email: "" })
  const [membership, setMembership] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Edit State
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ username: "", email: "" })

  const navigate = useNavigate()

  useEffect(() => {
    const username = localStorage.getItem("username")
    const email = localStorage.getItem("email")
    const userId = localStorage.getItem("userId")
    setUserInfo({ username: username || "Customer", email: email || "user@example.com" })
    setEditForm({ username: username || "", email: email || "" })

    if (username) {
      fetchMembership(username)
    }
    if (userId) {
      fetchUserProfile(userId)
    }
  }, [])

  const fetchUserProfile = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`)
      if (response.data.user && response.data.user.profileImage) {
        setProfileImage(`http://localhost:5001${response.data.user.profileImage}`)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  const fetchMembership = async (username) => {
    try {
      const response = await api.get(`/payments?name=${username}`)
      if (response.data.success && response.data.data.length > 0) {
        setMembership(response.data.data[0])
      }
    } catch (error) {
      console.error("Error fetching membership:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("userId")
    navigate("/")
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      setEditForm(userInfo) // Reset form to current info when opening
    }
  }

  const handleSaveProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User ID missing. Please login again.");
        return;
      }

      const response = await api.put(`/users/${userId}`, editForm);

      if (response.status === 200) {
        const updatedUser = response.data.user;

        // Update local state
        setUserInfo({ username: updatedUser.username, email: updatedUser.email });
        setIsEditing(false);

        // Update localStorage
        localStorage.setItem("username", updatedUser.username);
        localStorage.setItem("email", updatedUser.email);

        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update profile.");
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    setUploadingImage(true)

    try {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        alert("User ID missing. Please login again.")
        return
      }

      const formData = new FormData()
      formData.append("profileImage", file)

      const response = await api.post(`/users/${userId}/upload-profile-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (response.data.success) {
        setProfileImage(`http://localhost:5001${response.data.user.profileImage}`)
        alert("Profile image updated successfully!")
      }
    } catch (error) {
      console.error("Image upload failed:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploadingImage(false)
    }
  }

  return (

    <div className="min-h-screen bg-[#EFF6FF] mt-8">

      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={profileImage}
                alt="Customer"
                className="h-20 w-20 rounded-full border-4 border-white object-cover"
              />
              <label htmlFor="profile-upload-header" className="absolute -bottom-1 -right-1 rounded-full bg-black p-1.5 cursor-pointer hover:bg-gray-800">
                <Camera className="h-3 w-3 text-white" />
                <input
                  id="profile-upload-header"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{userInfo.username}</h1>
              <p className="text-sm text-gray-500">{userInfo.email}</p>
              <p className="text-sm font-medium text-gray-900">{membership ? membership.subscription : "No Active Plan"}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 flex items-center gap-2 rounded-lg">
              <Share2 className="h-4 w-4" />
              Share Profile
            </button>
            <button
              onClick={handleEditToggle}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg text-white ${isEditing ? "bg-red-500 hover:bg-red-600" : "bg-[#2563eb] hover:bg-[#1d4ed8]"}`}>
              {isEditing ? <><X className="h-4 w-4" /> Cancel Edit</> : <><Pencil className="h-4 w-4" /> Edit Profile</>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr,400px]">

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between text-gray-900">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              {isEditing && (
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  <Save className="h-4 w-4" /> Save Changes
                </button>
              )}
            </div>

            <div className="flex items-start gap-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <label htmlFor="profile-upload-main" className="absolute -bottom-2 -right-2 rounded-full bg-white p-2 shadow-md cursor-pointer hover:bg-gray-100">
                  <Camera className="h-5 w-5 text-gray-500" />
                  <input
                    id="profile-upload-main"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <label htmlFor="profile-upload-button" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg cursor-pointer inline-block">
                  {uploadingImage ? "Uploading..." : "Change Photo"}
                  <input
                    id="profile-upload-button"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-900 font-medium">Username</label>
                <input
                  type="text"
                  value={isEditing ? editForm.username : userInfo.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full border rounded-md p-2 capitalize ${isEditing ? "bg-white border-blue-500 ring-2 ring-blue-100" : "bg-gray-100 border-gray-200 cursor-not-allowed"}`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-900 font-medium">Email</label>
                <input
                  type="email"
                  value={isEditing ? editForm.email : userInfo.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full border rounded-md p-2 ${isEditing ? "bg-white border-blue-500 ring-2 ring-blue-100" : "bg-gray-100 border-gray-200 cursor-not-allowed"}`}
                />
              </div>
            </div>

            {!isEditing && (
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm text-gray-900 leading-relaxed">
                  Personal information can only be changed after clicking the Edit button on the top-right corner of the screen.
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Membership Info */}
            <div className="bg-white shadow-sm rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Membership Info</h2>
              <div>
                <p className="text-sm text-gray-500 mb-1">Plan Type</p>
                <p className="text-base font-bold text-gray-900">{membership ? membership.subscription : "Free Member"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <div className="flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${membership ? "bg-green-500" : "bg-gray-400"}`}></span>
                  <p className={`text-base font-semibold ${membership ? "text-green-600" : "text-gray-500"}`}>
                    {membership ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              {membership && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Renewal Date</p>
                  <p className="text-base font-bold text-gray-900">
                    {new Date(new Date(membership.createdAt).setMonth(new Date(membership.createdAt).getMonth() + 1)).toLocaleDateString()}
                  </p>
                </div>
              )}


              <button
                onClick={() => navigate("/customer/membership")}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg">
                Manage Plan
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white shadow-sm rounded-xl p-6 space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">Quick Links</h2>

              <button
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob(["User Report\n\nName: " + userInfo.username + "\nEmail: " + userInfo.email + "\nStatus: Active"], { type: 'text/plain' });
                  element.href = URL.createObjectURL(file);
                  element.download = "report.txt";
                  document.body.appendChild(element); // Required for this to work in FireFox
                  element.click();
                  alert("Report downloaded!");
                }}
                className="w-full flex items-center gap-3 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 rounded-lg">
                <Download className="h-5 w-5" />
                Download Report
              </button>

              <button
                onClick={() => alert("You have no favorite classes yet. Go to Classes to book one!")}
                className="w-full flex items-center gap-3 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 rounded-lg">
                <Heart className="h-5 w-5" />
                Favorite Classes
              </button>

              <button
                onClick={() => alert("No new notifications.")}
                className="w-full flex items-center gap-3 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 rounded-lg">
                <Bell className="h-5 w-5" />
                Notifications
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center gap-2 px-8 py-2 rounded-lg">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
