import React from "react"
import { UserPlus, CreditCard, Calendar } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "member",
    title: "New Member Registered",
    description: "John Doe signed up for 6-month plan",
    time: "2 hours ago",
    icon: UserPlus,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    description: "$150 from Sarah Johnson",
    time: "4 hours ago",
    icon: CreditCard,
  },
  {
    id: 3,
    type: "class",
    title: "Class Enrollment",
    description: "Emma Davis enrolled in Power Yoga",
    time: "5 hours ago",
    icon: Calendar,
  },
  {
    id: 4,
    type: "payment",
    title: "Payment Received",
    description: "$300 from Mike Chen",
    time: "1 day ago",
    icon: CreditCard,
  },
  {
    id: 5,
    type: "member",
    title: "Member Cancelled",
    description: "Alex Wilson cancelled membership",
    time: "2 days ago",
    icon: UserPlus,
  },
]

const iconColors = {
  member: "bg-blue-100 text-blue-600",
  payment: "bg-green-100 text-green-600",
  class: "bg-purple-100 text-purple-600",
}

export default function RecentActivities() {
  return (
    <div className="bg-white border border-gym-border rounded-2xl">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gym-border">
        <h2 className="text-lg font-semibold text-gym-text">
          Recent Activities
        </h2>
        <p className="text-sm text-gym-muted">
          Latest gym events and transactions
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon

          return (
            <div
              key={activity.id}
              className="flex gap-4 p-3 rounded-lg hover:bg-gym-bg transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-lg ${iconColors[activity.type]} flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gym-text">
                  {activity.title}
                </p>
                <p className="text-sm text-gym-muted truncate">
                  {activity.description}
                </p>
              </div>

              <p className="text-xs text-gym-muted whitespace-nowrap">
                {activity.time}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
