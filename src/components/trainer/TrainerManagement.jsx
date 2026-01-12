import { useState, useMemo, useEffect } from "react"
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react"
import api from "../../api/api"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import TrainerModal from "./TrainerModal"

export default function TrainersManagement() {
  const [trainers, setTrainers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [trainerModalOpen, setTrainerModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("add") // add | view | edit
  const [isLoading, setIsLoading] = useState(true)

  const fetchTrainers = async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/trainers')
      if (response.data.success) {
        // Map backend data to frontend structure if needed
        // Backend: { _id, name, email, phone, specialization, experience, photo, ... }
        // Frontend expects: { id, fullName, email, phone, specialization, experience, photo, status }
        // Note: Backend 'name' -> Frontend 'fullName'. Backend doesn't seem to have 'status', defaulting to 'Active'.
        const mapped = response.data.data.map(t => ({
          id: t._id,
          fullName: t.name,
          email: t.email,
          phone: t.phone,
          specialization: t.specialization,
          experience: t.experience,
          status: "Active", // Mock status
          photo: t.photo
            ? (t.photo.startsWith('http') ? t.photo : `http://localhost:5001/${t.photo.replace(/\\/g, '/')}`)
            : "https://via.placeholder.com/150",
          // Note: ideally use env variable for base url
        }))
        setTrainers(mapped)
      }
    } catch (error) {
      console.error("Error fetching trainers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrainers()
  }, [])

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) =>
      Object.values(trainer).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [trainers, searchTerm])

  const handleAddTrainer = () => {
    setModalMode("add")
    setSelectedTrainer(null)
    setTrainerModalOpen(true)
  }

  const handleViewTrainer = (trainer) => {
    setModalMode("view")
    setSelectedTrainer(trainer)
    setTrainerModalOpen(true)
  }

  const handleEditTrainer = (trainer) => {
    setModalMode("edit")
    setSelectedTrainer(trainer)
    setTrainerModalOpen(true)
  }

  const handleDeleteTrainer = (trainer) => {
    setSelectedTrainer(trainer)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedTrainer) {
      try {
        await api.delete(`/trainers/${selectedTrainer.id}`)
        fetchTrainers() // Refresh list
      } catch (error) {
        console.error("Error deleting trainer:", error)
        alert("Failed to delete trainer")
      }
      setDeleteModalOpen(false)
      setSelectedTrainer(null)
    }
  }

  const handleSaveTrainer = async (trainerData) => {
    // trainerData comes from modal. It might need mapping back to backend format.
    // Backend expects: name, email, phone, specialization, experience, photo (file)
    // If TrainerModal handles file upload properly and returns FormData, good. 
    // If it returns JSON, we need to adapt.
    // Assuming simple JSON for now, but photo upload requires FormData if changing photo.
    // IMPORTANT: Implementing full FormData support might be out of scope for a quick fix, 
    // but let's try to support basic text fields at least.

    // NOTE: This assumes TrainerModal returns an object with fields matching the inputs.
    // We map fullName -> name.

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("name", trainerData.fullName)
      formData.append("email", trainerData.email)
      formData.append("phone", trainerData.phone)
      formData.append("specialization", trainerData.specialization)
      formData.append("experience", trainerData.experience)

      // Only append photo if it's a File object (new upload)
      // TrainerModal passes the raw file in `photoFile`
      if (trainerData.photoFile instanceof File) {
        formData.append("photo", trainerData.photoFile)
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }

      if (modalMode === "add") {
        await api.post('/trainers', formData, config)
      } else if (modalMode === "edit" && selectedTrainer) {
        await api.put(`/trainers/${selectedTrainer.id}`, formData, config)
      }
      fetchTrainers()
    } catch (error) {
      console.error("Error saving trainer:", error)
      alert("Failed to save trainer.")
    }

    setTrainerModalOpen(false)
    setSelectedTrainer(null)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trainers Management</h1>
          <p className="mt-1 text-gray-500">Manage and organize your gym trainers</p>
        </div>
        <button
          onClick={handleAddTrainer}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Trainer
        </button>
      </div>

      {/* Search */}
      <div className="p-4 bg-gray-100 rounded">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search trainers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded border border-gray-300 bg-white pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="hidden md:table-cell px-4 py-3">Email</th>
              <th className="hidden lg:table-cell px-4 py-3">Phone</th>
              <th className="hidden lg:table-cell px-4 py-3">Specialization</th>
              <th className="hidden xl:table-cell px-4 py-3">Experience</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.length ? (
              filteredTrainers.map((trainer) => (
                <tr key={trainer.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={trainer.photo}
                      alt={trainer.fullName}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </td>
                  <td className="px-4 py-3">{trainer.fullName}</td>
                  <td className="hidden md:table-cell px-4 py-3">{trainer.email}</td>
                  <td className="hidden lg:table-cell px-4 py-3">{trainer.phone}</td>
                  <td className="hidden lg:table-cell px-4 py-3">{trainer.specialization}</td>
                  <td className="hidden xl:table-cell px-4 py-3">{trainer.experience} yrs</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${trainer.status === "Active" ? "bg-green-600" : "bg-red-600"
                        }`}
                    >
                      {trainer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleViewTrainer(trainer)}>
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button onClick={() => handleEditTrainer(trainer)}>
                        <Pencil className="h-4 w-4 text-yellow-600" />
                      </button>
                      <button onClick={() => handleDeleteTrainer(trainer)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-6 text-center text-gray-500">
                  No trainers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        trainer={selectedTrainer}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />

      <TrainerModal
        isOpen={trainerModalOpen}
        mode={modalMode}
        trainer={selectedTrainer}
        onSave={handleSaveTrainer}
        onClose={() => setTrainerModalOpen(false)}
      />
    </div>
  )
}
