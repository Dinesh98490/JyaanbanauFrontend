import { useState, useEffect } from "react"
import { Plus, TrendingDown, Dumbbell, Flame, X, Trash2, Pencil } from "lucide-react"
import api from "../api/api"

export default function Progress() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // New goal form state
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "Weight Loss",
    target: "",
    current: "",
    unit: "kg",
    deadline: "",
    percentage: 0
  })

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const username = localStorage.getItem("username")
      if (!username) {
        setLoading(false)
        return
      }
      const response = await api.get(`/progress?name=${username}`)
      if (response.data.success) {
        const mappedGoals = response.data.data.map(g => ({
          id: g._id,
          icon: "flame", // default
          title: g.title || g.name,
          category: "General",
          progress: g.percentage || 0,
          deadline: g.duration
        }))
        setGoals(mappedGoals)
      }
    } catch (error) {
      console.error("Error fetching goals:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddOrUpdateGoal = async (e) => {
    e.preventDefault()
    try {
      const username = localStorage.getItem("username")
      const payload = {
        name: username,
        title: newGoal.title,
        duration: newGoal.deadline,
        percentage: newGoal.percentage
      }

      if (isEditing && editingId) {
        await api.put(`/progress/${editingId}`, payload)
        alert("Goal updated!")
      } else {
        await api.post("/progress", payload)
        alert("Goal added!")
      }

      handleCloseModal()
      fetchGoals()
    } catch (error) {
      console.error("Error saving goal:", error)
      alert("Failed to save goal")
    }
  }

  const handleDeleteGoal = async (id) => {
    if (!confirm("Are you sure you want to delete this goal?")) return
    try {
      await api.delete(`/progress/${id}`)
      alert("Goal deleted!")
      fetchGoals()
    } catch (error) {
      console.error("Delete failed:", error)
      alert("Failed to delete goal")
    }
  }

  const handleEditClick = (goal) => {
    setNewGoal({
      title: goal.title,
      category: "General",
      target: "",
      current: "",
      unit: "%",
      deadline: goal.deadline,
      percentage: goal.progress
    })
    setEditingId(goal.id)
    setIsEditing(true)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setIsEditing(false)
    setEditingId(null)
    setNewGoal({ title: "", category: "Weight Loss", target: "", current: "", unit: "kg", deadline: "", percentage: 0 })
  }

  if (loading) return <div className="p-12">Loading goals...</div>

  return (
    <main className="min-h-screen bg-white p-6 md:p-12 mt-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Track Your Progress
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Monitor your fitness metrics, celebrate achievements, and stay motivated on your wellness journey.
          </p>
        </div>

        {/* Goals Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Goals</h2>
            <p className="text-gray-700">
              Track progress toward your fitness journey
            </p>
          </div>

          {/* Default Button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition">
            <Plus className="h-5 w-5" />
            Add Goals
          </button>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.length > 0 ? (
            goals.map((goal) => {
              const IconComponent = Flame

              return (
                <div
                  key={goal.id}
                  className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow relative group"
                >
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditClick(goal)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </button>
                    <button onClick={() => handleDeleteGoal(goal.id)} className="p-2 bg-gray-100 rounded-full hover:bg-red-100">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>

                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <IconComponent className="h-8 w-8 text-gray-600" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {goal.title}
                        </h3>
                        <p className="text-gray-600">{goal.category}</p>
                        <p className="text-sm text-gray-500">Target: {goal.deadline}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600">
                        {goal.progress}%
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
              No goals found. Add one to get started!
            </div>
          )}

        </div>

      </div>

      {/* Add/Edit Goal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">{isEditing ? "Edit Goal" : "Add New Goal"}</h2>
            <form onSubmit={handleAddOrUpdateGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g. Lose 5kg"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline / Duration</label>
                <input
                  type="text"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  placeholder="e.g. 1 Month"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Progress Percentage (%)</label>
                <input
                  type="number"
                  value={newGoal.percentage}
                  onChange={(e) => setNewGoal({ ...newGoal, percentage: e.target.value })}
                  placeholder="0"
                  min="0"
                  max="100"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 mt-4">
                {isEditing ? "Update Goal" : "Save Goal"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
