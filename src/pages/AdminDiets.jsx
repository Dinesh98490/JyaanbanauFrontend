import { useState } from "react"
import DietPlansGrid from "../components/Diets/DietsPlansGrid"
import AddDietForm from "../components/Diets/AddDietForm"
import { Plus } from "lucide-react"

export default function AdminDiets() {
  const [customDiets, setCustomDiets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingDiet, setEditingDiet] = useState(null)

  const handleAddDiet = (newDiet) => {
    if (editingDiet) {
      setCustomDiets((prev) =>
        prev.map((diet) =>
          diet.id === editingDiet.id
            ? { ...newDiet, id: editingDiet.id }
            : diet
        )
      )
      setEditingDiet(null)
    } else {
      setCustomDiets((prev) => [newDiet, ...prev])
    }
    setShowForm(false)
  }

  const handleDeleteDiet = (dietId) => {
    setCustomDiets((prev) =>
      prev.filter((diet) => diet.id !== dietId)
    )
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
              Choose the perfect diet plan
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
            Add Diet Plan
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
        <DietPlansGrid
          plans={customDiets}
          onEdit={handleEditDiet}
          onDelete={handleDeleteDiet}
          isCustom
        />
      </div>
    </main>
  )
}
