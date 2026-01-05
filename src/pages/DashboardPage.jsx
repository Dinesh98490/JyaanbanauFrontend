import { useState } from "react"
import AdminNavbar from "../components/adminnavbar/AdminNavbar"
import AdminSidebar from "../components/adminsidebar/AdminSidebar"

import KpiCards from "../components/dashboard/KpiCards"
import  RevenueChart  from "../components/dashboard/RevenueChart"
import  MembersAnalytics  from "../components/dashboard/Members"
import AttendanceChart from "../components/dashboard/AttendenceChart"
import  RecentActivities  from "../components/dashboard/RecentActivities"
import  TopClasses  from "../components/dashboard/TopClasses"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gym-bg">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto px-8 py-6 max-w-7xl mx-auto">
          
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

        </main>
      </div>
    </div>
  )
}
