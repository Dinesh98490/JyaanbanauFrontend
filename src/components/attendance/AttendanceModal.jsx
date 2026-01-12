import { useState, useEffect } from "react"
import { X } from "lucide-react"
import api from "../../api/api"

export default function AttendanceModal({ isOpen, onClose, onSubmit, editingRecord, users }) {
    const [formData, setFormData] = useState({
        userId: "",
        date: "",
        status: "Present",
        checkInTime: "",
        checkOutTime: "",
        remarks: "",
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (isOpen) {
            if (editingRecord) {
                // Populate form for editing
                setFormData({
                    userId: editingRecord.userId?._id || editingRecord.userId || "",
                    date: editingRecord.date ? new Date(editingRecord.date).toISOString().split("T")[0] : "",
                    status: editingRecord.status || "Present",
                    checkInTime: editingRecord.checkInTime || "",
                    checkOutTime: editingRecord.checkOutTime || "",
                    remarks: editingRecord.remarks || "",
                })
            } else {
                // Reset for new record
                setFormData({
                    userId: "",
                    date: new Date().toISOString().split("T")[0],
                    status: "Present",
                    checkInTime: "",
                    checkOutTime: "",
                    remarks: "",
                })
            }
            setErrors({})
        }
    }, [isOpen, editingRecord])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.userId) newErrors.userId = "Please select a user"
        if (!formData.date) newErrors.date = "Date is required"
        if (!formData.status) newErrors.status = "Status is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        onSubmit(formData)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold">
                        {editingRecord ? "Edit Attendance" : "Mark Attendance"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* User Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            User *
                        </label>
                        <select
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.userId ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user._id || user.id} value={user._id || user.id}>
                                    {user.username || user.name}
                                </option>
                            ))}
                        </select>
                        {errors.userId && (
                            <p className="text-red-500 text-xs mt-1">{errors.userId}</p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date *
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.date && (
                            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status *
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.status ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                            <option value="Excused">Excused</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                        )}
                    </div>

                    {/* Check In Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Check In Time
                        </label>
                        <input
                            type="time"
                            name="checkInTime"
                            value={formData.checkInTime}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Check Out Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Check Out Time
                        </label>
                        <input
                            type="time"
                            name="checkOutTime"
                            value={formData.checkOutTime}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Remarks */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Remarks
                        </label>
                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Optional notes..."
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            {editingRecord ? "Update" : "Mark Attendance"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
