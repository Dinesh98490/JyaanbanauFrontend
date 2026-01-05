import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  { month: "Jan", revenue: 18400, target: 24000 },
  { month: "Feb", revenue: 22300, target: 22000 },
  { month: "Mar", revenue: 20000, target: 23000 },
  { month: "Apr", revenue: 27800, target: 25000 },
  { month: "May", revenue: 18700, target: 24000 },
  { month: "Jun", revenue: 23900, target: 23500 },
  { month: "Jul", revenue: 24800, target: 24500 },
  { month: "Aug", revenue: 20100, target: 22000 },
  { month: "Sep", revenue: 24200, target: 25000 },
  { month: "Oct", revenue: 19700, target: 23000 },
  { month: "Nov", revenue: 21200, target: 23500 },
  { month: "Dec", revenue: 19800, target: 24000 },
]

export default function RevenueChart() {
  const [timeframe, setTimeframe] = useState("year")

  return (
    <div className="border border-gray-200 bg-white rounded-lg shadow-md p-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Revenue Analytics</h2>
          <p className="text-sm text-gray-500">Monthly revenue vs target</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe("month")}
            className={`px-3 py-1 text-sm rounded-lg transition-all ${
              timeframe === "month"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Month
          </button>

          <button
            onClick={() => setTimeframe("year")}
            className={`px-3 py-1 text-sm rounded-lg transition-all ${
              timeframe === "year"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#0661f3"
              radius={[8, 8, 0, 0]}
              name="Actual Revenue"
            />
            <Bar
              dataKey="target"
              fill="#e5e7eb"
              radius={[8, 8, 0, 0]}
              name="Target Revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
