import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Calendar, Clock, User } from "lucide-react"
import api from "../api/api"
import AttendanceModal from "../components/attendance/AttendanceModal"

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch attendance records
  const fetchAttendance = async () => {
    try {
      const response = await api.get("/attendance")
      setAttendanceRecords(response.data.data || [])
    } catch (error) {
      console.error("Error fetching attendance:", error)
      alert("Failed to fetch attendance records")
    } finally {
      setLoading(false)
    }
  }

  // Fetch users for dropdown
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users")
      console.log("Users fetched:", response.data)
      setUsers(response.data.users || [])
    } catch (error) {
      console.error("Error fetching users:", error)
      console.error("Error response:", error.response?.data)
      // If authentication fails, try to continue with empty users list
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.warn("Authentication failed when fetching users. Make sure you're logged in as admin.")
      }
    }
  }

  useEffect(() => {
    fetchAttendance()
    fetchUsers()
  }, [])

  const handleAddAttendance = () => {
    setEditingRecord(null)
    setIsModalOpen(true)
  }

  const handleEditAttendance = (record) => {
    setEditingRecord(record)
    setIsModalOpen(true)
  }

  const handleDeleteAttendance = async (recordId) => {
    if (!window.confirm("Are you sure you want to delete this attendance record?")) return

    try {
      await api.delete(`/attendance/${recordId}`)
      setAttendanceRecords((prev) => prev.filter((r) => r._id !== recordId))
      alert("Attendance record deleted successfully")
    } catch (error) {
      console.error("Error deleting attendance:", error)
      alert("Failed to delete attendance record")
    }
  }

  const handleSubmitAttendance = async (formData) => {
    try {
      if (editingRecord) {
        // Update existing record
        const response = await api.put(`/attendance/${editingRecord._id}`, formData)
        setAttendanceRecords((prev) =>
          prev.map((r) => (r._id === editingRecord._id ? response.data.data : r))
        )
        alert("Attendance updated successfully")
      } else {
        // Create new record
        const response = await api.post("/attendance", formData)
        setAttendanceRecords((prev) => [response.data.data, ...prev])
        alert("Attendance marked successfully")
      }
      setIsModalOpen(false)
      setEditingRecord(null)
    } catch (error) {
      console.error("Error saving attendance:", error)
      alert("Failed to save attendance record")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800"
      case "Absent":
        return "bg-red-100 text-red-800"
      case "Late":
        return "bg-yellow-100 text-yellow-800"
      case "Excused":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredRecords = attendanceRecords.filter((record) => {
    const userName = record.userId?.name || record.userId?.username || ""
    return userName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Attendance Management</h1>
              <p className="text-gray-500 mt-1">Track member attendance records</p>
            </div>
            <button
              onClick={handleAddAttendance}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Mark Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Attendance Table */}
        {loading ? (
          <div className="text-center py-10">Loading attendance records...</div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No attendance records found. Click "Mark Attendance" to add one.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remarks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {record.userId?.name || record.userId?.username || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkInTime ? (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {record.checkInTime}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkOutTime ? (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {record.checkOutTime}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs truncate">
                          {record.remarks || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditAttendance(record)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAttendance(record._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingRecord(null)
        }}
        onSubmit={handleSubmitAttendance}
        editingRecord={editingRecord}
        users={users}
      />
    </main>
  )
}
