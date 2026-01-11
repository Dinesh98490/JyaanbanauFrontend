import { useState, useEffect } from "react"
import { CreditCard, Eye, Plus, X } from "lucide-react"
import api from "../api/api"

export default function Payment() {
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [cardForm, setCardForm] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: ""
  })

  useEffect(() => {
    fetchPayment()
  }, [])

  const fetchPayment = async () => {
    try {
      const username = localStorage.getItem("username")
      if (!username) {
        setLoading(false)
        return
      }
      const response = await api.get(`/payments?name=${username}`)
      if (response.data.success && response.data.data.length > 0) {
        // Assume the first one is the active latest subscription
        setCurrentPlan(response.data.data[0])
      }
    } catch (error) {
      console.error("Error fetching payment:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMethod = (e) => {
    e.preventDefault()
    // Mock saving card
    alert("Payment method added successfully!")
    setShowModal(false)
    // Reset form
    setCardForm({ number: "", holder: "", expiry: "", cvv: "" })
  }

  if (loading) return <div className="p-8">Loading payments...</div>

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 mt-8 ">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Manage Your Payments
          </h1>
          <p className="text-lg text-gray-700">
            View your billing information, manage payment methods,
            <br />
            and track all your transactions.
          </p>
        </div>

        {/* Current Plan */}
        {currentPlan ? (
          <div className="mb-8 bg-[#c5d4e8] p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-700 mb-1">Current Plan</p>
                <h2 className="text-3xl font-bold text-[#0046ff]">
                  {currentPlan.subscription}
                </h2>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-1">Billing Amount</p>
                <p className="text-4xl font-bold text-gray-900">Rs {currentPlan.price}</p>
                <p className="text-sm text-gray-700">Monthly</p>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-1">Next Billing Date</p>
                <p className="text-4xl font-bold text-gray-900">
                  {new Date(new Date(currentPlan.createdAt).setMonth(new Date(currentPlan.createdAt).getMonth() + 1)).toLocaleDateString()}
                </p>
                <p className="text-sm text-green-700">· Active</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = "/customer/membership"}
                className="bg-[#0046ff] hover:bg-[#0039cc] text-white px-8 py-3 rounded-lg text-lg">
                Upgrade Plan
              </button>
              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to cancel?")) {
                    try {
                      const response = await api.delete(`/payments/${currentPlan._id}`);
                      if (response.data.success) {
                        alert("Membership cancelled successfully.");
                        setCurrentPlan(null);
                      }
                    } catch (error) {
                      console.error("Cancellation failed:", error);
                      alert("Failed to cancel membership.");
                    }
                  }
                }}
                className="bg-[#0046ff] hover:bg-[#0039cc] text-white px-8 py-3 rounded-lg text-lg">
                Cancel Membership
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-8 bg-gray-100 p-8 rounded-xl text-center">
            <p className="text-xl text-gray-600">No active subscription found.</p>
            <a href="/customer/membership" className="text-blue-600 font-bold mt-2 inline-block">Browse Plans</a>
          </div>
        )}


        {/* Payments Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Payment Methods</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#0046ff] hover:bg-[#0039cc] text-white px-6 py-3 rounded-lg text-lg">
            <Plus className="w-5 h-5" />
            Add Method
          </button>
        </div>

        {/* Payment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Credit Card */}
          <div className="bg-[#0046ff] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -right-10 top-10 w-40 h-40 bg-white/5 rounded-full" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <p className="text-sm text-white/80">Card Type</p>
                  <p className="text-xl font-semibold">Visa</p>
                </div>
                <CreditCard className="w-12 h-12 text-white/90" />
              </div>

              <div className="mb-12">
                <p className="text-sm text-white/80 mb-2">Card Number</p>
                <p className="text-2xl font-mono tracking-wider">
                  •••• •••• •••• 2451
                </p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-white/80">Card Holder Name</p>
                  <p className="text-lg font-semibold">{localStorage.getItem("username") || "Customer"}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-white/80">Expiry</p>
                  <p className="text-lg font-semibold">12/2026</p>
                </div>

                <button
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="ml-4 p-2 rounded-lg hover:bg-white/10 transition"
                >
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex flex-col gap-6">

            {/* Primary Badge */}
            <div className="bg-[#b8e6c0] p-6 rounded-xl flex gap-4 shadow-md">
              <div className="bg-[#4ade80] p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Primary Payment Method
                </h3>
                <p className="text-gray-800">
                  This card will be used for all payments
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => alert("Edit feature coming soon.")}
                className="flex-1 bg-[#0046ff] hover:bg-[#0039cc] text-white py-4 rounded-xl text-lg">
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Remove this payment method?")) {
                    alert("Payment method removed.");
                  }
                }}
                className="flex-1 bg-[#0046ff] hover:bg-[#0039cc] text-white py-4 rounded-xl text-lg">
                Remove
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Add Method Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Add Payment Method</h2>
            <form onSubmit={handleAddMethod} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full border p-2 rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder</label>
                <input type="text" placeholder="Name on card" className="w-full border p-2 rounded" required />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full border p-2 rounded" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input type="text" placeholder="123" className="w-full border p-2 rounded" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#0046ff] text-white py-3 rounded-lg font-bold hover:bg-[#0039cc] mt-4">
                Save Method
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
