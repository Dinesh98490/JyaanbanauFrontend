import { useState, useEffect } from "react"
import DietPlansGrid from "../components/Diets/DietsPlansGrid"
import AddDietForm from "../components/Diets/AddDietForm"
import { Plus } from "lucide-react"
import api from "../api/api"

export default function AdminDiets() {
  const [diets, setDiets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingDiet, setEditingDiet] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchDiets = async () => {
    try {
      const response = await api.get("/diets")
      setDiets(response.data.data || [])
    } catch (error) {
      console.error("Error fetching diets:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiets()
  }, [])

  const handleAddDiet = async (dietData) => {
    try {
      const formData = new FormData()
      formData.append("planName", dietData.name)
      formData.append("proteinLevel", dietData.protein)
      formData.append("dailyCalories", dietData.calories)
      formData.append("description", dietData.description)

      // Append image file if exists
      if (dietData.imageFile) {
        formData.append("image", dietData.imageFile)
      }

      if (editingDiet) {
        // Update existing diet
        const response = await api.put(`/diets/${editingDiet.id || editingDiet._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        setDiets((prev) =>
          prev.map((diet) =>
            (diet.id === editingDiet.id || diet._id === editingDiet._id) ? response.data.data : diet
          )
        )
        setEditingDiet(null)
      } else {
        // Create new diet
        const response = await api.post("/diets", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        setDiets((prev) => [response.data.data, ...prev])
      }
      setShowForm(false)
    } catch (error) {
      console.error("Error saving diet:", error)
      alert("Failed to save diet plan")
    }
  }

  const handleDeleteDiet = async (dietId) => {
    if (window.confirm("Are you sure you want to delete this diet plan?")) {
      try {
        await api.delete(`/diets/${dietId}`)
        setDiets((prev) => prev.filter((diet) => (diet.id !== dietId && diet._id !== dietId)))
      } catch (error) {
        console.error("Error deleting diet:", error)
        alert("Failed to delete diet plan")
      }
    }
  }

  const handleEditDiet = (diet) => {
    setEditingDiet(diet)
    setShowForm(true)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Fitness Diet Plans</h1>
            <p className="text-gray-500">
              Manage diet plans for your members
            </p>
          </div>

          {/* Add Diet Button in Blue */}
          <button
            onClick={() => {
              setEditingDiet(null)
              setShowForm(!showForm)
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            {showForm ? "Cancel" : "Add Diet Plan"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Add/Edit Diet Form */}
        {showForm && (
          <AddDietForm
            onAddDiet={handleAddDiet}
            editingDiet={editingDiet}
            onCancel={() => {
              setShowForm(false)
              setEditingDiet(null)
            }}
          />
        )}

        {/* Diet Plans Grid */}
        {loading ? (
          <div className="text-center py-10">Loading diet plans...</div>
        ) : (
          <DietPlansGrid
            plans={diets}
            onEdit={handleEditDiet}
            onDelete={handleDeleteDiet}
            isCustom
          />
        )}
      </div>
    </main>
  )
}
