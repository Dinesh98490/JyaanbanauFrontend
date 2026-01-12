import KpiCards from "../components/dashboard/KpiCards"
import RevenueChart from "../components/dashboard/RevenueChart"
import MembersAnalytics from "../components/dashboard/Members"
import AttendanceChart from "../components/dashboard/AttendenceChart"
import RecentActivities from "../components/dashboard/RecentActivities"
import TopClasses from "../components/dashboard/TopClasses"

import { useEffect, useState } from "react"
import api from "../api/api"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    membersCount: 0,
    activeMembersCount: 0,
    trainersCount: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/stats")
        setStats(response.data)
      } catch (error) {
        console.error("Error fetching admin stats:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      {/* KPI Cards */}
      <KpiCards stats={stats} />

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
