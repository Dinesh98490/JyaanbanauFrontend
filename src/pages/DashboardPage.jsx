import KpiCards from "../components/dashboard/KpiCards"
import RevenueChart from "../components/dashboard/RevenueChart"
import MembersAnalytics from "../components/dashboard/Members"
import AttendanceChart from "../components/dashboard/AttendenceChart"
import RecentActivities from "../components/dashboard/RecentActivities"
import TopClasses from "../components/dashboard/TopClasses"

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* KPI Cards */}
      <KpiCards />

      {/* Revenue & Members Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <MembersAnalytics />
      </div>

      {/* Attendance & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <AttendanceChart />
        <RecentActivities />
      </div>

      {/* Top Classes */}
      <div className="mt-8">
        <TopClasses />
      </div>
    </div>
  )
}
