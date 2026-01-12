import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, DollarSign, Check } from "lucide-react"
import api from "../api/api"
import SubscriptionModal from "../components/subscription/SubscriptionModal"

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    try {
      const response = await api.get("/subscriptions")
      setSubscriptions(response.data.data || [])
    } catch (error) {
      console.error("Error fetching subscriptions:", error)
      alert("Failed to fetch subscriptions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const handleAddSubscription = () => {
    setEditingSubscription(null)
    setIsModalOpen(true)
  }

  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription)
    setIsModalOpen(true)
  }

  const handleDeleteSubscription = async (subscriptionId) => {
    if (!window.confirm("Are you sure you want to delete this subscription plan?")) return

    try {
      await api.delete(`/subscriptions/${subscriptionId}`)
      setSubscriptions((prev) => prev.filter((s) => s._id !== subscriptionId))
      alert("Subscription deleted successfully")
    } catch (error) {
      console.error("Error deleting subscription:", error)
      alert("Failed to delete subscription")
    }
  }

  const handleSubmitSubscription = async (formData) => {
    try {
      if (editingSubscription) {
        // Update existing subscription
        const response = await api.put(`/subscriptions/${editingSubscription._id}`, formData)
        setSubscriptions((prev) =>
          prev.map((s) => (s._id === editingSubscription._id ? response.data.data : s))
        )
        alert("Subscription updated successfully")
      } else {
        // Create new subscription
        const response = await api.post("/subscriptions", formData)
        setSubscriptions((prev) => [response.data.data, ...prev])
        alert("Subscription created successfully")
      }
      setIsModalOpen(false)
      setEditingSubscription(null)
    } catch (error) {
      console.error("Error saving subscription:", error)
      alert("Failed to save subscription")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Subscription Plans</h1>
              <p className="text-gray-500 mt-1">Manage membership subscription plans</p>
            </div>
            <button
              onClick={handleAddSubscription}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center py-10">Loading subscription plans...</div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No subscription plans found. Click "Add Subscription" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((subscription) => (
              <div
                key={subscription._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">{subscription.subscriptionName}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">NPR {subscription.price}</span>
                    <span className="text-blue-100 ml-2">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() => handleEditSubscription(subscription)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSubscription(subscription._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingSubscription(null)
        }}
        onSubmit={handleSubmitSubscription}
        editingSubscription={editingSubscription}
      />
    </main>
  )
}
