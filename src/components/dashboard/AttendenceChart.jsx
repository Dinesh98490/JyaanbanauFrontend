import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const attendanceData = [
  { day: "Mon", attendance: 245 },
  { day: "Tue", attendance: 312 },
  { day: "Wed", attendance: 289 },
  { day: "Thu", attendance: 334 },
  { day: "Fri", attendance: 401 },
  { day: "Sat", attendance: 389 },
  { day: "Sun", attendance: 267 },
]

export default function AttendanceChart() {
  return (
    <div className="bg-white border border-gym-border rounded-2xl">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gym-border">
        <h2 className="text-lg font-semibold text-gym-text">
          Weekly Attendance
        </h2>
        <p className="text-sm text-gym-muted">
          Member attendance this week
        </p>
      </div>

      {/* Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#0661f3"
              strokeWidth={3}
              dot={{ fill: "#0661f3", r: 5 }}
              activeDot={{ r: 7 }}
              name="Members"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
