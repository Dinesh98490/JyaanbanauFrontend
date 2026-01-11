import React, { useEffect, useState } from "react"
import { Element } from "react-scroll"
import { Check } from "lucide-react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

const bgColor = "bg-gray-50"

// Fallback plans in case backend is empty or fails
const fallbackPlans = [
  {
    _id: "basic",
    subscriptionName: "Basic",
    price: 2999,
    description: "Perfect for new gyms",
    features: [
      "Basic Members",
      "No Trainer Plan",
      "Limited Access",
      "No Payment Plan",
    ],
  },
  {
    _id: "standard",
    subscriptionName: "Standard",
    price: 4999,
    description: "Most popular",
    featured: true,
    features: [
      "Up to 200 Members",
      "Trainer Management",
      "Class Scheduling",
      "Payment Support",
      "Priority Support",
    ],
  },
  {
    _id: "premium",
    subscriptionName: "Premium",
    price: 8999,
    description: "For large gyms",
    features: [
      "Unlimited Members",
      "Full Trainer",
      "Custom Management",
      "Advanced Analytics",
      "Premium Support",
    ],
  },
]

export default function Membership() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/subscriptions")
        if (response.data.success && response.data.data.length > 0) {
          // Map backend data to frontend structure if needed, or use as is
          setPlans(response.data.data)
        } else {
          setPlans(fallbackPlans)
        }
      } catch (error) {
        console.error("Error fetching plans:", error)
        setPlans(fallbackPlans)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  const handleSubscribe = async (plan) => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please login to subscribe")
      navigate("/login")
      return
    }

    const username = localStorage.getItem("username")
    if (!username) {
      alert("User information missing. Please login again.")
      navigate("/login")
      return
    }

    try {
      if (confirm(`Are you sure you want to subscribe to ${plan.subscriptionName || plan.name}?`)) {
        await api.post("/payments", {
          name: username,
          paymentMethod: "Credit Card", // Dummy default
          subscription: plan.subscriptionName || plan.name,
          price: plan.price
        })
        alert("Subscription successful!")
        navigate("/customer/profile")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      alert("Failed to subscribe. Please try again.")
    }
  }

  if (loading) {
    return <div className="text-center py-24">Loading plans...</div>
  }

  return (
    <Element name="pricing">
      <section className={`${bgColor} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500 text-lg md:text-xl">
              Choose the plan that fits your gym
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-12">
            {plans.map((plan) => {
              // Check if plan is "Standard" to highlight it, or use a featured flag if you have one
              const isFeatured = plan.subscriptionName === "Standard" || plan.featured === true

              // Support both backend 'subscriptionName' and fallback 'name'
              const planName = plan.subscriptionName || plan.name

              return (
                <div
                  key={plan._id || planName}
                  className={`flex-1 max-w-xs p-10 rounded-2xl shadow-lg transition-all duration-300 flex flex-col justify-between ${isFeatured
                    ? "bg-[#0661F3] text-white scale-105 hover:scale-110"
                    : "bg-white hover:shadow-xl"
                    }`}
                >
                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      {planName}
                    </h3>

                    <p className={`mb-8 ${isFeatured ? "text-white/80" : "text-gray-500"
                      }`}>
                      {plan.description || "Unlock your potential"}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-4xl font-extrabold">
                        Rs {plan.price}
                      </span>
                      <span className={`${isFeatured ? "text-white/80" : "text-gray-500"
                        }`}>
                        /month
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check
                            className={`w-4 h-4 ${isFeatured ? "text-white" : "text-blue-600"
                              }`}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className={`mt-8 w-full py-3 rounded-lg font-semibold transition ${isFeatured
                      ? "bg-white text-[#0661F3] hover:bg-white/90"
                      : "bg-[#0661F3] text-white hover:bg-blue-700"
                      }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              )
            })}
          </div>

        </div>
      </section>
    </Element>
  )
}
