import { Users, DollarSign, Dumbbell } from "lucide-react"

const kpiData = [
  {
    icon: Users,
    label: "Total Members",
    value: "1,284",
    change: "+12.5%",
    positive: true,
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    label: "Active Members",
    value: "945",
    change: "+8.2%",
    positive: true,
    color: "from-gym-primary to-gym-primary/70",
  },
  {
    icon: DollarSign,
    label: "Monthly Revenue",
    value: "$28,450",
    change: "+23.1%",
    positive: true,
    color: "from-green-500 to-green-600",
  },
  {
    icon: Dumbbell,
    label: "Total Trainers",
    value: "48",
    change: "+2 this month",
    positive: true,
    color: "from-orange-500 to-orange-600",
  },
]

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon

        return (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl p-6 border border-gym-border hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gym-muted text-sm font-medium mb-1">
                  {kpi.label}
                </p>
                <h3 className="text-3xl font-bold text-gym-text mb-3">
                  {kpi.value}
                </h3>
                <p
                  className={`text-sm font-semibold ${
                    kpi.positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {kpi.change}
                </p>
              </div>

              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
