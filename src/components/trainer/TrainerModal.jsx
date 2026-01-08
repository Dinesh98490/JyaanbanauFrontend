import { useState, useEffect, useRef } from "react"
import { X, Upload } from "lucide-react"

export default function TrainerModal({ isOpen, mode, trainer, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    specialization: "Strength",
    experience: 1,
    status: "Active",
    photo: "",
  })

  const fileInputRef = useRef(null)

  useEffect(() => {
    if (trainer) {
      setFormData(trainer)
    } else {
      setFormData({
        id: "",
        fullName: "",
        email: "",
        phone: "",
        specialization: "Strength",
        experience: 1,
        status: "Active",
        photo: "",
      })
    }
  }, [trainer, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? parseInt(value) : value,
    }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  const isViewMode = mode === "view"
  const title =
    mode === "add" ? "Add New Trainer" : mode === "view" ? "View Trainer" : "Edit Trainer"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Photo */}
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
              {formData.photo ? (
                <img src={formData.photo} alt="Trainer" className="h-full w-full object-cover" />
              ) : (
                <div className="text-center">
                  <Upload className="h-6 w-6 text-gray-400 mx-auto" />
                  <span className="text-xs text-gray-400">No photo</span>
                </div>
              )}
            </div>

            {!isViewMode && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center gap-2 rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
                >
                  <Upload className="h-4 w-4" /> Upload Photo
                </button>
              </>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isViewMode}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isViewMode}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isViewMode}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="text-sm font-medium">Specialization</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              disabled={isViewMode}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Strength</option>
              <option>Cardio</option>
              <option>Yoga</option>
              <option>HIIT</option>
              <option>Pilates</option>
              <option>CrossFit</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium">Experience (Years)</label>
            <input
              name="experience"
              type="number"
              min="1"
              max="50"
              value={formData.experience}
              onChange={handleChange}
              disabled={isViewMode}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isViewMode}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
            >
              {isViewMode ? "Close" : "Cancel"}
            </button>

            {!isViewMode && (
              <button
                type="submit"
                className="flex-1 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                {mode === "add" ? "Add Trainer" : "Save Changes"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
