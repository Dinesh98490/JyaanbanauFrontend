import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const memberData = [
  { name: "Active", value: 945, color: "#0661f3" },
  { name: "New", value: 235, color: "#fbbf24" },
  { name: "Inactive", value: 104, color: "#d1d5db" },
]

export default function Members() {
  return (
    <div className="border border-gray-200 bg-white rounded-lg shadow-md p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Members Analytics</h2>
        <p className="text-sm text-gray-500">Membership breakdown</p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Pie Chart */}
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={memberData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {memberData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {memberData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700 font-medium">{item.name}</span>
              </div>

              <span className="text-sm font-bold text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
