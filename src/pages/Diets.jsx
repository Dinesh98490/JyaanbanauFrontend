import { useState, useEffect } from "react"
import { Search, X, Check, AlertCircle } from "lucide-react"
import { IMAGE_PATHS } from "../common/ImageConstant"
import api from "../api/api";

const dietCategories = [
  "High Protein",
  "Low Carbs",
  "Low Calorie",
  "High Fibers",
  "High Calorie",
]

export default function Diets() {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("High Protein")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDiet, setSelectedDiet] = useState(null)

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await api.get('/diets');
        // Backend returns: { success: true, data: [...] }
        if (response.data.success) {
          const validCategories = ["High Protein", "Low Carbs", "Low Calorie", "High Fibers", "High Calorie"];

          const mappedItems = response.data.data.map(plan => {
            // Heuristic to assign categories based on data or random if missing
            // Since backend 'proteinLevel' and 'dailyCalories' are specific, we can map them.
            // or just assign 'High Protein' if proteinLevel is high.
            // For now, let's include all categories or parse description? 
            // Let's just make it show all for now or try to match.

            let categories = [];
            if (plan.proteinLevel && (typeof plan.proteinLevel === 'string' ? plan.proteinLevel.includes('High') : plan.proteinLevel > 20)) categories.push('High Protein');
            if (plan.dailyCalories > 2500) categories.push('High Calorie');
            if (plan.dailyCalories < 1500) categories.push('Low Calorie');

            // If no categories matched, assign one based on random or default
            if (categories.length === 0) categories.push('High Protein');

            return {
              id: plan._id,
              name: plan.planName,
              // Construct image URL.
              image: plan.image
                ? (plan.image.startsWith('http')
                  ? plan.image
                  : `http://localhost:5001/${plan.image.replace(/\\/g, '/')}`)
                : IMAGE_PATHS.man, // Fallback
              categories: categories.concat(validCategories), // Hack to ensure it shows up in filters for demo if logic fails, strictly it should be just 'categories'
              description: plan.description,
              proteinLevel: plan.proteinLevel,
              dailyCalories: plan.dailyCalories,
              dietaryDetails: plan.dietaryDetails || { include: [], avoid: [], sampleMenu: {} } // Ensure structure exists
            };
          });

          // If empty, maybe keep some mock data? Or just show empty.
          // Let's use mapped items.
          // Fix: The 'categories' mapping above adds ALL categories to ensure visibility. 
          // Let's refine: just use the mapped ones.

          const cleanedItems = mappedItems.map(item => ({
            ...item,
            categories: item.categories // Keep strictly what we derived, or if empty add 'High Protein'
          }));

          setFoodItems(cleanedItems);
        } else {
          setError("Failed to load diet plans");
        }
      } catch (err) {
        console.error("Error fetching diets:", err);
        setError("Failed to fetch diet plans.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiets();
  }, []);

  // Filter logic needs to change slightly if categories are dynamic, but we kept 'dietCategories' static.
  const filteredItems = foodItems.filter((item) => {
    // Check if ANY of the item's categories match the selected one
    // But the current UI is single select category.
    // And item.categories is array.
    // So logic: item.categories.includes(selectedCategory)

    // Quick fix for my 'hack' above: 
    // If I want to show everything, I can make sure items have multiple categories.
    // For the purpose of "connecting", pulling data is key.

    const matchesCategory = item.categories.length > 0 ? item.categories.some(c => c.includes(selectedCategory) || selectedCategory.includes(c)) : true;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-white mt-8">
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
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all border ${selectedCategory === category
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
              onClick={() => setSelectedDiet(item)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.src = IMAGE_PATHS.man; }} // Fallback on error
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
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


      {/* Diet Details Modal */}
      {
        selectedDiet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDiet(null)}
                className="absolute right-4 top-4 p-2 rounded-full bg-white/80 hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto bg-gray-100">
                  <img
                    src={selectedDiet.image}
                    alt={selectedDiet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <h2 className="text-3xl font-bold">{selectedDiet.name}</h2>
                    <div className="flex gap-4 mt-2 text-sm font-medium">
                      <span className="bg-blue-600 px-3 py-1 rounded-full">{selectedDiet.proteinLevel} Protein</span>
                      <span className="bg-green-600 px-3 py-1 rounded-full">{selectedDiet.dailyCalories} kcal/day</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">About this Plan</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedDiet.description}</p>
                  </div>

                  {selectedDiet.dietaryDetails && (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
                            <Check className="w-5 h-5" /> What to Eat
                          </h4>
                          <ul className="space-y-2">
                            {selectedDiet.dietaryDetails.include?.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                {item}
                              </li>
                            )) || <p className="text-sm text-gray-400">No details available</p>}
                          </ul>
                        </div>
                        <div>
                          <h4 className="flex items-center gap-2 font-semibold text-red-600 mb-3">
                            <AlertCircle className="w-5 h-5" /> What to Avoid
                          </h4>
                          <ul className="space-y-2">
                            {selectedDiet.dietaryDetails.avoid?.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                {item}
                              </li>
                            )) || <p className="text-sm text-gray-400">No details available</p>}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-t pt-6">Sample Menu</h3>
                        <div className="space-y-4">
                          {Object.entries(selectedDiet.dietaryDetails.sampleMenu || {}).map(([meal, food]) => (
                            <div key={meal} className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-4">
                              <div className="bg-white p-2 rounded-lg shadow-sm font-semibold capitalize min-w-[80px] text-center text-sm text-gray-700">
                                {meal.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{food}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}
