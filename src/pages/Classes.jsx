import { useState } from "react"

const classes = [
  {
    id: 1,
    type: "Strength",
    title: "Power Lifting 101",
    description: "Build strength and muscle mass with focused powerlifting techniques",
    trainer: "Arjun Singh",
    time: "06:00 AM",
    duration: "60 min",
    enrolled: 18,
    capacity: 20,
    level: "Intermediate",
    progress: 90,
  },
  {
    id: 2,
    type: "Yoga",
    title: "Morning Yoga Flow",
    description: "Start your day with rejuvenating yoga and stretching",
    trainer: "Priya Patel",
    time: "06:00 AM",
    duration: "60 min",
    enrolled: 20,
    capacity: 20,
    level: "Beginner",
    progress: 100,
  },
  {
    id: 3,
    type: "Cardio",
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training for maximum calorie burn",
    trainer: "Amit Verma",
    time: "06:00 AM",
    duration: "60 min",
    enrolled: 20,
    capacity: 25,
    level: "Advanced",
    progress: 80,
  },
  {
    id: 4,
    type: "Cardio",
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training for maximum calorie burn",
    trainer: "Amit Verma",
    time: "06:00 AM",
    duration: "60 min",
    enrolled: 20,
    capacity: 25,
    level: "Advanced",
    progress: 80,
  },
]

export default function FitnessClassBooking() {
  const [activeFilter, setActiveFilter] = useState("All Classes")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClasses = classes.filter((cls) => {
    const matchesFilter =
      activeFilter === "All Classes" || cls.type === activeFilter

    const matchesSearch =
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.trainer.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  return (
    <div className="min-h-screen bg-[#EFF6FF] p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 mt-20">
          <h1 className="text-4xl font-bold mb-2">
            Book Your Perfect Class
          </h1>
          <p className="text-gray-600">
            Choose from diverse fitness classes led by certified trainers.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search classes or trainers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-6 p-4 rounded-lg border border-gray-300"
        />

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["All Classes", "Yoga", "Cardio", "Strength"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg border transition ${
                activeFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <span className="text-sm font-semibold text-blue-600">
                {cls.type}
              </span>

              <h2 className="text-xl font-bold mt-2">
                {cls.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2">
                {cls.description}
              </p>

              {/* Trainer */}
              <div className="flex items-center gap-3 mt-4">
                <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
                  {getInitials(cls.trainer)}
                </div>
                <span>{cls.trainer}</span>
              </div>

              {/* Time */}
              <p className="text-sm text-gray-500 mt-3">
                ⏰ {cls.time} • {cls.duration}
              </p>

              {/* Enrollment */}
              <p className="text-sm text-gray-500 mt-1">
                👥 {cls.enrolled}/{cls.capacity} enrolled
              </p>

              {/* Level */}
              <span className="inline-block mt-3 px-3 py-1 text-sm rounded-full bg-gray-200">
                {cls.level}
              </span>

              {/* Progress */}
              <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${cls.progress}%` }}
                />
              </div>

              {/* Button */}
              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Book Now →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
