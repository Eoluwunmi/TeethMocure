/**
 * Admin Dashboard
 * Main admin hub for managing orders, marketers, content
 */

import { Link } from "react-router-dom";
import { Package, Users, PenTool, TrendingUp, MessageSquare } from "lucide-react";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/lib/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  // Mock data
  const stats = {
    total_orders: 248,
    pending_orders: 12,
    total_revenue: "₦1,245,800",
    active_marketers: 34,
  };

  const recent_orders = [
    {
      id: 1,
      code: "TMCURE-2024-0245",
      customer: "Chioma Okafor",
      package: "2bottles",
      status: "confirmed",
      amount: "₦4,900",
      date: "Today 2:30 PM",
    },
    {
      id: 2,
      code: "TMCURE-2024-0244",
      customer: "Tunde Adeleke",
      package: "3bottles",
      status: "delivered",
      amount: "₦7,100",
      date: "Aug 7, 10:45 AM",
    },
    {
      id: 3,
      code: "TMCURE-2024-0243",
      customer: "Folake Adeyemi",
      package: "1bottle",
      status: "pending",
      amount: "₦2,600",
      date: "Aug 7, 8:20 AM",
    },
  ];

  return (
    <RoleGuard allowedRoles={["owner"]}>
      <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm px-6 py-6 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Welcome back, {user?.full_name || "Admin"}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/admin/content-generator"
                className="bg-[#1B4332] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#16382a] transition-colors flex items-center gap-2"
              >
                <PenTool size={18} />
                Generate Content
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            {[
              {
                icon: Package,
                title: "Total Orders",
                value: stats.total_orders,
                subtitle: `${stats.pending_orders} pending`,
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Users,
                title: "Active Marketers",
                value: stats.active_marketers,
                subtitle: "Approved & active",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: TrendingUp,
                title: "Total Revenue",
                value: stats.total_revenue,
                subtitle: "This month",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: MessageSquare,
                title: "Chat Messages",
                value: "1,240",
                subtitle: "Last 7 days",
                color: "bg-orange-100 text-orange-600",
              },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-2">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-bold text-lg text-gray-900">Recent Orders</h2>
                  <Link
                    to="/admin/orders"
                    className="text-[#1B4332] font-semibold text-sm hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-4 text-left font-bold text-gray-700">Order Code</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-700">Customer</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-700">Amount</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent_orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900">{order.code}</td>
                          <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                          <td className="px-6 py-4 font-bold text-[#1B4332]">{order.amount}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                order.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: "View All Orders", icon: "📦", link: "/admin/orders" },
                    { label: "Manage Marketers", icon: "👥", link: "/admin/marketers" },
                    { label: "Generate Content", icon: "✍️", link: "/admin/content-generator" },
                    { label: "View Analytics", icon: "📊", link: "/admin/analytics" },
                  ].map((action, i) => (
                    <Link
                      key={i}
                      to={action.link}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 hover:text-[#1B4332] font-medium"
                    >
                      <span>{action.icon}</span>
                      <span>{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] text-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-3">📌 Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Orders Today</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue Today</span>
                    <span className="font-bold">₦45,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Approval</span>
                    <span className="font-bold">3 marketers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chat Messages</span>
                    <span className="font-bold">24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="mt-10 grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-6">Top Marketers This Month</h3>
              <div className="space-y-4">
                {[
                  { name: "Adekunle Adebayo", sales: 24, revenue: "₦117,600" },
                  { name: "Zainab Mohammed", sales: 18, revenue: "₦88,200" },
                  { name: "Chinedu Okonkwo", sales: 15, revenue: "₦73,500" },
                ].map((marketer, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{marketer.name}</p>
                      <p className="text-sm text-gray-600">{marketer.sales} orders delivered</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#1B4332]">{marketer.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-6">Popular Products</h3>
              <div className="space-y-4">
                {[
                  { name: "2-Bottle Pack (Recommended)", orders: 156, percentage: 62 },
                  { name: "3-Bottle Pack (Complete)", orders: 68, percentage: 27 },
                  { name: "1-Bottle Pack (Starter)", orders: 24, percentage: 10 },
                ].map((product, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                      <p className="text-sm font-bold text-[#1B4332]">{product.percentage}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#1B4332] h-2 rounded-full transition-all"
                        style={{ width: `${product.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{product.orders} orders</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
