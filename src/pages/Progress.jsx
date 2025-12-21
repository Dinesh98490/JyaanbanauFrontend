import { Plus, TrendingDown, Dumbbell, Flame } from "lucide-react"

export default function Progress() {
  const goals = [
    {
      id: 1,
      icon: "chart-down",
      title: "Loss 5 kg",
      category: "Weight Loss",
      progress: 60,
      current: 78,
      total: 75,
      unit: "kg",
      deadline: "12/31/2025",
    },
    {
      id: 2,
      icon: "dumbbell",
      title: "Complete 50 workouts",
      category: "Fitness",
      progress: 48,
      current: 24,
      total: 50,
      unit: "sessions",
      deadline: "12/31/2025",
    },
    {
      id: 3,
      icon: "flame",
      title: "Burn 100k calories",
      category: "Endurance",
      progress: 12.5,
      current: 12450,
      total: 100000,
      unit: "kcal",
      deadline: "12/31/2025",
    },
  ]

  const formatNumber = (num) => num.toLocaleString()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-12">
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
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition">
            <Plus className="h-5 w-5" />
            Add Goals
          </button>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.map((goal) => {
            const IconComponent =
              goal.icon === "chart-down"
                ? TrendingDown
                : goal.icon === "dumbbell"
                ? Dumbbell
                : Flame

            return (
              <div
                key={goal.id}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow"
              >
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

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-700 font-medium">
                    {formatNumber(goal.current)}/{formatNumber(goal.total)} {goal.unit}
                  </div>
                  <div className="text-gray-600">
                    Deadline: {goal.deadline}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}
