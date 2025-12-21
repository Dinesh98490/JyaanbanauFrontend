import { useState } from "react"
import { CreditCard, Eye, Plus } from "lucide-react"

export default function Payment() {
  const [showCardDetails, setShowCardDetails] = useState(false)

  return (
    <div className="min-h-screen bg-[#e8ecf0] p-4 md:p-8">
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
        <div className="mb-8 bg-[#c5d4e8] p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-700 mb-1">Current Plan</p>
              <h2 className="text-3xl font-bold text-[#0046ff]">
                Basic Membership
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-1">Billing Amount</p>
              <p className="text-4xl font-bold text-gray-900">Rs 2999</p>
              <p className="text-sm text-gray-700">Monthly</p>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-1">Next Billing Date</p>
              <p className="text-4xl font-bold text-gray-900">12/9/2025</p>
              <p className="text-sm text-green-700">· Active</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-[#0046ff] hover:bg-[#0039cc] text-white px-8 py-3 rounded-lg text-lg">
              Upgrade Plan
            </button>
            <button className="bg-[#0046ff] hover:bg-[#0039cc] text-white px-8 py-3 rounded-lg text-lg">
              Cancel Membership
            </button>
          </div>
        </div>

        {/* Payments Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Payments</h2>
          <button className="flex items-center gap-2 bg-[#0046ff] hover:bg-[#0039cc] text-white px-6 py-3 rounded-lg text-lg">
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
                  <p className="text-lg font-semibold">Customer</p>
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
              <button className="flex-1 bg-[#0046ff] hover:bg-[#0039cc] text-white py-4 rounded-xl text-lg">
                Edit
              </button>
              <button className="flex-1 bg-[#0046ff] hover:bg-[#0039cc] text-white py-4 rounded-xl text-lg">
                Remove
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
