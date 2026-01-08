import { useState, useMemo } from "react"
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react"

import DeleteConfirmationModal from "./DeleteConfirmationModal"
import TrainerModal from "./TrainerModal"

const MOCK_TRAINERS = [
  {
    id: "TR001",
    fullName: "John Smith",
    email: "john.smith@gym.com",
    phone: "+1 (555) 123-4567",
    specialization: "Strength",
    experience: 8,
    status: "Active",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: "TR002",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@gym.com",
    phone: "+1 (555) 234-5678",
    specialization: "Cardio",
    experience: 6,
    status: "Active",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  // ... add more trainers
]

export default function TrainersManagement() {
  const [trainers, setTrainers] = useState(MOCK_TRAINERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [trainerModalOpen, setTrainerModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("add") // add | view | edit

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

  const confirmDelete = () => {
    if (selectedTrainer) {
      setTrainers(trainers.filter((t) => t.id !== selectedTrainer.id))
      setDeleteModalOpen(false)
      setSelectedTrainer(null)
    }
  }

  const handleSaveTrainer = (trainer) => {
    if (modalMode === "add") {
      const newTrainer = {
        ...trainer,
        id: `TR${String(trainers.length + 1).padStart(3, "0")}`,
      }
      setTrainers([...trainers, newTrainer])
    } else if (modalMode === "edit" && selectedTrainer) {
      setTrainers(
        trainers.map((t) => (t.id === selectedTrainer.id ? trainer : t))
      )
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
                    />
                  </td>
                  <td className="px-4 py-3">{trainer.fullName}</td>
                  <td className="hidden md:table-cell px-4 py-3">{trainer.email}</td>
                  <td className="hidden lg:table-cell px-4 py-3">{trainer.phone}</td>
                  <td className="hidden lg:table-cell px-4 py-3">{trainer.specialization}</td>
                  <td className="hidden xl:table-cell px-4 py-3">{trainer.experience} yrs</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        trainer.status === "Active" ? "bg-green-600" : "bg-red-600"
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
