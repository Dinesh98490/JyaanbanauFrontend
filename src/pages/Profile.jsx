import { useState } from "react"
import {
  Share2,
  Pencil,
  Camera,
  User,
  Download,
  Heart,
  Bell,
  LogOut,
} from "lucide-react"

export default function Profile() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg")

  return (
    <div className="min-h-screen bg-[#e8eef5] p-4 md:p-8">
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
              <div className="absolute -bottom-1 -right-1 rounded-full bg-black p-1.5 cursor-pointer">
                <Camera className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">Customer</h1>
              <p className="text-sm text-gray-500">customer@gmail.com</p>
              <p className="text-sm font-medium text-gray-900">Basic Member</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 flex items-center gap-2 rounded-lg">
              <Share2 className="h-4 w-4" />
              Share Profile
            </button>
            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 flex items-center gap-2 rounded-lg">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr,400px]">

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-gray-900">
              <User className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>

            <div className="flex items-start gap-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-2 shadow-md cursor-pointer">
                  <Camera className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex-1">
                <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg">
                  Change Photo
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-900 font-medium">Username</label>
                <input
                  type="text"
                  value="Customer"
                  disabled
                  className="w-full bg-gray-300 border-0 rounded-md p-2 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-900 font-medium">Email</label>
                <input
                  type="email"
                  value="customer@gmail.com"
                  disabled
                  className="w-full bg-gray-300 border-0 rounded-md p-2 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm text-gray-900 leading-relaxed">
                Personal information can only be changed after clicking the Edit button on the top-right corner of the screen.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Membership Info */}
            <div className="bg-white shadow-sm rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Membership Info</h2>
              <div>
                <p className="text-sm text-gray-500 mb-1">Plan Type</p>
                <p className="text-base font-bold text-gray-900">Basic Membership</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <p className="text-base font-semibold text-green-600">Active</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Renewal Date</p>
                <p className="text-base font-bold text-gray-900">Dec 9, 2025</p>
              </div>

              <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg">
                Manage Plan
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white shadow-sm rounded-xl p-6 space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">Quick Links</h2>

              <button className="w-full flex items-center gap-3 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 rounded-lg">
                <Download className="h-5 w-5" />
                Download Report
              </button>

              <button className="w-full flex items-center gap-3 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 rounded-lg">
                <Heart className="h-5 w-5" />
                Favorite Classes
              </button>

              <button className="w-full flex items-center gap-3 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 rounded-lg">
                <Bell className="h-5 w-5" />
                Notifications
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-end">
          <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center gap-2 px-8 py-2 rounded-lg">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
