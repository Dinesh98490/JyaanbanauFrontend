import { useState } from "react"
import { Search } from "lucide-react"

const foodItems = [
  {
    id: "1",
    name: "Meat",
    image: "/raw-steak-with-herbs-on-plate.jpg",
    categories: ["High Protein", "High Calorie"],
  },
  {
    id: "2",
    name: "Avocado",
    image: "/avocado-cut-in-half-on-dark-background.jpg",
    categories: ["Low Carbs", "High Fibers"],
  },
  {
    id: "3",
    name: "Banana",
    image: "/two-bananas-on-yellow-background.jpg",
    categories: ["High Fibers", "High Calorie"],
  },
  {
    id: "4",
    name: "Apple",
    image: "/red-apple-on-wooden-surface.jpg",
    categories: ["Low Calorie", "High Fibers"],
  },
  {
    id: "5",
    name: "Fish",
    image: "/multiple-fresh-fish-on-ice.jpg",
    categories: ["High Protein", "Low Calorie"],
  },
  {
    id: "6",
    name: "Peanut",
    image: "/peanuts-in-shells-scattered.jpg",
    categories: ["High Protein", "High Calorie", "High Fibers"],
  },
]

const dietCategories = [
  "High Protein",
  "Low Carbs",
  "Low Calorie",
  "High Fibers",
  "High Calorie",
]

export default function Diets() {
  const [selectedCategory, setSelectedCategory] = useState("High Protein")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = item.categories.includes(selectedCategory)
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Diets and Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Your transformation begins with the right food, the right plan, and the right mindset.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 md:mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8 md:mb-12">
          {dietCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all border ${
                selectedCategory === category
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">
              No items found. Try a different category or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
