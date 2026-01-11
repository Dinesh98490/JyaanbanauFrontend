import React, { useState } from "react"
import { ChevronDown, ChevronUp, Save, RotateCcw, Upload } from "lucide-react"

const defaultSettings = {
  gym: {
    name: "JyaanBanau Fitness",
    address: "123 Main Street, City",
    contactNumber: "+1 (555) 123-4567",
    email: "info@jyaanbanau.com",
    logo: "",
  },
  admin: {
    name: "Admin User",
    username: "admin",
    email: "admin@jyaanbanau.com",
    password: "",
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  },
  appearance: {
    darkMode: false,
    primaryColor: "#3B82F6",
  },
}

export default function Setting() {
  const [settings, setSettings] = useState(defaultSettings)
  const [expandedSections, setExpandedSections] = useState({
    gym: true,
    admin: true,
    notifications: true,
    appearance: true,
  })
  const [logoPreview, setLogoPreview] = useState("")
  const [saveMessage, setSaveMessage] = useState("")

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleGymChange = (field, value) => setSettings((prev) => ({ ...prev, gym: { ...prev.gym, [field]: value } }))
  const handleAdminChange = (field, value) => setSettings((prev) => ({ ...prev, admin: { ...prev.admin, [field]: value } }))
  const handleNotificationChange = (field) =>
    setSettings((prev) => ({ ...prev, notifications: { ...prev.notifications, [field]: !prev.notifications[field] } }))
  const handleAppearanceChange = (field, value) =>
    setSettings((prev) => ({ ...prev, appearance: { ...prev.appearance, [field]: value } }))

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result
        setLogoPreview(result)
        handleGymChange("logo", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveChanges = () => {
    setSaveMessage("Settings saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handleResetDefaults = () => {
    setSettings(defaultSettings)
    setLogoPreview("")
    setSaveMessage("Settings reset to defaults!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Settings</h1>
          <p className="text-gray-500 text-lg">
            Customize your gym information, profile, notifications, and appearance.
          </p>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg shadow-md">
            {saveMessage}
          </div>
        )}

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Gym Info */}
          <SectionCard
            title="Gym Information"
            expanded={expandedSections.gym}
            toggle={() => toggleSection("gym")}
          >
            <div className="space-y-4">
              <InputField label="Gym Name" value={settings.gym.name} onChange={(v) => handleGymChange("name", v)} />
              <InputField label="Address" value={settings.gym.address} onChange={(v) => handleGymChange("address", v)} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Contact Number" value={settings.gym.contactNumber} onChange={(v) => handleGymChange("contactNumber", v)} />
                <InputField label="Email" value={settings.gym.email} onChange={(v) => handleGymChange("email", v)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gym Logo</label>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Logo</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                  {logoPreview && (
                    <div className="w-32 h-32 rounded-md overflow-hidden border border-gray-300 shadow-sm">
                      <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Admin Profile */}
          <SectionCard title="Admin Profile" expanded={expandedSections.admin} toggle={() => toggleSection("admin")}>
            <div className="space-y-4">
              {["name", "username", "email", "password"].map((field) => (
                <InputField
                  key={field}
                  label={field === "password" ? "New Password" : capitalize(field)}
                  value={settings.admin[field]}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field === "password" ? "Leave blank to keep current password" : ""}
                  onChange={(v) => handleAdminChange(field, v)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Notifications */}
          <SectionCard
            title="Notifications"
            expanded={expandedSections.notifications}
            toggle={() => toggleSection("notifications")}
          >
            <div className="space-y-3">
              {Object.keys(settings.notifications).map((key) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                  <span className="text-gray-700 font-medium">{key.replace(/([A-Z])/g, " $1")}</span>
                  <input
                    type="checkbox"
                    checked={settings.notifications[key]}
                    onChange={() => handleNotificationChange(key)}
                    className="w-5 h-5 rounded border-gray-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Appearance */}
          <SectionCard
            title="Appearance"
            expanded={expandedSections.appearance}
            toggle={() => toggleSection("appearance")}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                <span className="text-gray-700 font-medium">Dark Mode</span>
                <input
                  type="checkbox"
                  checked={settings.appearance.darkMode}
                  onChange={(e) => handleAppearanceChange("darkMode", e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                    className="w-16 h-10 rounded cursor-pointer border border-gray-300"
                  />
                  <input
                    type="text"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-end mt-8">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-2 px-6 py-3 border border-red-400 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <RotateCcw size={18} />
            Reset Defaults
          </button>

          <button
            onClick={handleSaveChanges}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Helper Components ---
const SectionCard = ({ title, expanded, toggle, children }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <button
      onClick={toggle}
      className="w-full flex justify-between items-center px-6 py-4 text-gray-800 font-semibold hover:bg-gray-50 transition"
    >
      {title}
      {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {expanded && <div className="px-6 py-4 border-t border-gray-200">{children}</div>}
  </div>
)

const InputField = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
)

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
