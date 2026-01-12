import { useState } from "react"
import { Trash2, Edit2, Eye } from "lucide-react"

export default function DietPlansGrid({ plans, onEdit, onDelete, isCustom = false }) {
  const [viewingPlan, setViewingPlan] = useState(null)

  const handleViewDetails = (plan) => setViewingPlan(plan)

  return (
    <>
      {/* Grid of diet plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative h-40 sm:h-48 bg-gray-100 overflow-hidden">
              <img
                src={plan.image || plan.imageUrl || "/placeholder.svg"}
                alt={plan.planName || plan.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Header */}
            <div className="p-3 border-b">
              <h3 className="text-lg font-bold line-clamp-2">{plan.planName || plan.name}</h3>
              <p className="text-sm font-semibold text-blue-600">{plan.proteinLevel || plan.protein}</p>
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
              <div className="flex justify-between p-2 bg-gray-100 rounded-md">
                <span className="text-xs text-gray-500">Calories</span>
                <span className="font-bold">{plan.dailyCalories || plan.calories}</span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">{plan.description}</p>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap mt-2">
                <button
                  onClick={() => handleViewDetails(plan)}
                  className="flex-1 flex items-center justify-center gap-1 text-xs px-2 py-1 border rounded-md hover:bg-gray-100"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">View</span>
                </button>

                {onEdit && (
                  <button
                    onClick={() => onEdit(plan)}
                    className="flex-1 flex items-center justify-center gap-1 text-xs px-2 py-1 border rounded-md hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                )}

                {onDelete && (
                  <button
                    onClick={() => onDelete(plan.id)}
                    className="flex-1 flex items-center justify-center gap-1 text-xs px-2 py-1 border border-red-500 text-red-600 rounded-md hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing plan */}
      {viewingPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="p-4 border-b">
              <h3 className="text-xl font-bold">{viewingPlan.name}</h3>
              <p className="text-sm text-blue-600">{viewingPlan.protein}</p>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative h-48 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={viewingPlan.imageUrl || "/placeholder.svg"}
                  alt={viewingPlan.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 bg-gray-100 rounded-md">
                <p className="text-xs text-gray-500 mb-1">Daily Calories</p>
                <p className="text-2xl font-bold">{viewingPlan.calories}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{viewingPlan.description}</p>
              </div>

              <button
                onClick={() => setViewingPlan(null)}
                className="w-full px-4 py-2 border rounded-md hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}



export const dietPlans = [
  {
    id: "1",
    name: "High Protein Muscle Gain",
    protein: "High (180g)",
    calories: 2800,
    description:
      "Designed for muscle building with calorie surplus and high protein intake. Perfect for intense weightlifting and strength training programs.",
    imageUrl: "/high-protein-muscle-building-meals.jpg",
  },
  {
    id: "2",
    name: "Lean Cut & Definition",
    protein: "High (160g)",
    calories: 2000,
    description:
      "Calorie deficit diet focused on fat loss while preserving muscle. Ideal for cutting phases and achieving lean muscle definition.",
    imageUrl: "/lean-healthy-salad-bowls.jpg",
  },
  {
    id: "3",
    name: "Keto Low-Carb",
    protein: "Moderate (120g)",
    calories: 1800,
    description:
      "Ketogenic diet with minimal carbohydrates and high healthy fats. Great for rapid fat loss and stable energy levels.",
    imageUrl: "/keto-diet-foods-avocado-eggs.jpg",
  },
  {
    id: "4",
    name: "Balanced Maintenance",
    protein: "Moderate (140g)",
    calories: 2300,
    description:
      "Well-rounded macronutrient balance for maintaining current weight. Perfect for athletes who want steady performance.",
    imageUrl: "/balanced-nutrition-plate.png",
  },
  {
    id: "5",
    name: "Vegan Plant-Based",
    protein: "High (150g)",
    calories: 2200,
    description:
      "Complete plant-based diet with all essential amino acids. Ideal for vegans and those seeking sustainable nutrition.",
    imageUrl: "/vegan-plant-based-bowl.jpg",
  },
  {
    id: "6",
    name: "Mediterranean Heart-Healthy",
    protein: "Moderate (130g)",
    calories: 2100,
    description:
      "Mediterranean diet focused on heart health and longevity. Rich in omega-3s, whole grains, and quality fats.",
    imageUrl: "/mediterranean-diet-fish-olive-oil.jpg",
  },
  {
    id: "7",
    name: "Intermittent Fasting",
    protein: "High (170g)",
    calories: 2400,
    description:
      "Time-restricted eating with concentrated nutrients. Supports metabolism and cellular recovery during fasting windows.",
    imageUrl: "/healthy-protein-rich-meals.jpg",
  },
  {
    id: "8",
    name: "Endurance Athletic",
    protein: "High (155g)",
    calories: 2600,
    description:
      "Optimized for cardiovascular fitness and endurance sports. Higher carbs for sustained energy during training.",
    imageUrl: "/endurance-athlete-nutrition-pasta.jpg",
  },
  {
    id: "9",
    name: "Paleo Whole Foods",
    protein: "High (165g)",
    calories: 2350,
    description:
      "Whole, unprocessed foods focusing on lean proteins and natural sources. Eliminates grains and processed items.",
    imageUrl: "/paleo-diet-whole-foods-meat.jpg",
  },
  {
    id: "10",
    name: "Rapid Weight Loss",
    protein: "High (145g)",
    calories: 1600,
    description:
      "Aggressive calorie deficit for fast results. Includes appetite-suppressing foods and strategic meal timing.",
    imageUrl: "/weight-loss-nutritious-meal.jpg",
  },
]
