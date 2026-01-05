import React from "react"

const classesData = [
  {
    id: 1,
    name: "Power Yoga",
    trainer: "Sarah Johnson",
    enrolled: 42,
    level: "Intermediate",
    status: "Active",
    capacity: 50,
  },
  {
    id: 2,
    name: "HIIT Bootcamp",
    trainer: "Mike Chen",
    enrolled: 38,
    level: "Advanced",
    status: "Active",
    capacity: 40,
  },
  {
    id: 3,
    name: "Pilates Core",
    trainer: "Emma Davis",
    enrolled: 28,
    level: "Beginner",
    status: "Active",
    capacity: 30,
  },
  {
    id: 4,
    name: "Spin & Burn",
    trainer: "John Martinez",
    enrolled: 35,
    level: "Intermediate",
    status: "Full",
    capacity: 35,
  },
  {
    id: 5,
    name: "CrossFit WOD",
    trainer: "Alex Wilson",
    enrolled: 32,
    level: "Advanced",
    status: "Active",
    capacity: 35,
  },
]

const levelColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-purple-100 text-purple-800",
}

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Full: "bg-orange-100 text-orange-800",
}

export default function TopClasses() {
  return (
    <div className="bg-white border border-gym-border rounded-2xl">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gym-border">
        <h2 className="text-lg font-semibold text-gym-text">
          Top Gym Classes
        </h2>
        <p className="text-sm text-gym-muted">
          Current class enrollments and details
        </p>
      </div>

      {/* Content */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gym-bg border-b border-gym-border">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gym-text">
                Class Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gym-text">
                Trainer
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gym-text">
                Enrolled
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gym-text">
                Level
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gym-text">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gym-border">
            {classesData.map((cls) => (
              <tr
                key={cls.id}
                className="hover:bg-gym-bg transition-colors"
              >
                <td className="py-3 px-4 text-sm font-medium text-gym-text">
                  {cls.name}
                </td>

                <td className="py-3 px-4 text-sm text-gym-muted">
                  {cls.trainer}
                </td>

                <td className="py-3 px-4 text-sm text-gym-text">
                  <span className="font-semibold">{cls.enrolled}</span>
                  <span className="text-gym-muted">
                    /{cls.capacity}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${levelColors[cls.level]}`}
                  >
                    {cls.level}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[cls.status]}`}
                  >
                    {cls.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
