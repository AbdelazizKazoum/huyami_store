export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      changeType: "positive",
      icon: "💰",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive",
      icon: "📦",
    },
    {
      title: "Active Customers",
      value: "8,901",
      change: "+3.1%",
      changeType: "positive",
      icon: "👥",
    },
    {
      title: "Products Sold",
      value: "2,468",
      change: "-2.4%",
      changeType: "negative",
      icon: "🛍️",
    },
  ];

  const recentOrders = [
    {
      id: "#001",
      customer: "John Doe",
      amount: "$199.99",
      status: "Delivered",
      date: "2024-01-15",
    },
    {
      id: "#002",
      customer: "Jane Smith",
      amount: "$89.50",
      status: "Processing",
      date: "2024-01-15",
    },
    {
      id: "#003",
      customer: "Mike Johnson",
      amount: "$299.99",
      status: "Shipped",
      date: "2024-01-14",
    },
    {
      id: "#004",
      customer: "Sarah Wilson",
      amount: "$149.99",
      status: "Pending",
      date: "2024-01-14",
    },
    {
      id: "#005",
      customer: "Tom Brown",
      amount: "$79.99",
      status: "Delivered",
      date: "2024-01-13",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-700 bg-green-100";
      case "shipped":
        return "text-blue-700 bg-blue-100";
      case "processing":
        return "text-yellow-700 bg-yellow-100";
      case "pending":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <p
                  className={`text-sm mt-2 ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">📦</div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {order.amount}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                <div className="text-2xl mb-2">➕</div>
                <p className="font-medium text-gray-900">Add Product</p>
                <p className="text-sm text-gray-600">Create a new product</p>
              </button>
              <button className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                <div className="text-2xl mb-2">📝</div>
                <p className="font-medium text-gray-900">Manage Orders</p>
                <p className="text-sm text-gray-600">View and update orders</p>
              </button>
              <button className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                <div className="text-2xl mb-2">👥</div>
                <p className="font-medium text-gray-900">View Customers</p>
                <p className="text-sm text-gray-600">
                  Manage customer accounts
                </p>
              </button>
              <button className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                <div className="text-2xl mb-2">📊</div>
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-600">View detailed reports</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Sales Overview
          </h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <p className="text-gray-600">Sales chart would go here</p>
              <p className="text-sm text-gray-500 mt-2">
                Integration with Chart.js or similar library needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
