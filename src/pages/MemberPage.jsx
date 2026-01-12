import { useState, useEffect } from "react";
import api from "../api/api";
import { Trash2, Search, User, Plus, Edit2 } from "lucide-react";
import UserModal from "../components/user/UserModal";

export default function MemberPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/users");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
      alert("Error fetching members: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await api.delete(`/users/${id}`);
        setMembers(members.filter((member) => member._id !== id));
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("Failed to delete member");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (formData) => {
    try {
      if (selectedUser) {
        // Update
        const response = await api.put(`/users/${selectedUser._id}`, formData);
        setMembers((prev) =>
          prev.map((m) => (m._id === selectedUser._id ? response.data.user : m))
        );
      } else {
        // Create
        const response = await api.post("/users", formData);
        setMembers((prev) => [response.data.user, ...prev]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error.response?.data?.message || "Failed to save user");
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-500 mt-1">Manage your gym members</p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Member</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  Loading members...
                </td>
              </tr>
            ) : filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No members found
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                      <span className="font-medium text-gray-900">
                        {member.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{member.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${member.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {member.role || 'customer'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        title="Edit Member"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete Member"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </div>
  );
}
