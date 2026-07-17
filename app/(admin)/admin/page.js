import Header from "@/app/components/admin/Header";
import Sidebar from "@/app/components/admin/SideNavbar";
import StatCard from "@/app/components/admin/StartCart";

export default function Dashboard() {
  return (
    <main className="flex-1 bg-gray-300 p-8">
      <Header />

      <div className="grid lg:grid-cols-4 gap-6 mt-8">
        <StatCard title="Revenue" value="$18,420" color="text-[#E17000]" />

        <StatCard title="Orders" value="520" color="text-blue-600" />

        <StatCard title="Customers" value="1,250" color="text-green-600" />

        <StatCard title="Products" value="83" color="text-red-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span- text-gray-600 2 bg-white h-[400px] rounded-xl shadow flex items-center justify-center text-2xl font-bold">
          Sales Chart
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-xl text-gray-600 mb-5">Top Products</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-gray-600 ">
              <span>Nike Air Max</span>
              <span>152 Sold</span>
            </div>

            <div className="flex justify-between text-gray-600 ">
              <span>Hoodie</span>
              <span>131 Sold</span>
            </div>

            <div className="flex justify-between text-gray-600 ">
              <span>T-shirt</span>
              <span>120 Sold</span>
            </div>

            <div className="flex justify-between text-gray-600 ">
              <span>Cap</span>
              <span>98 Sold</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow mt-8 p-6 text-gray-600 ">
        <h2 className="text-xl font-bold mb-5">Recent Orders</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">Customer</th>

              <th>Status</th>

              <th>Total</th>

              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4">John Doe</td>

              <td>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                  Delivered
                </span>
              </td>

              <td>$120</td>

              <td>Today</td>
            </tr>

            <tr className="border-b">
              <td className="py-4">Alex</td>

              <td>
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
                  Pending
                </span>
              </td>

              <td>$220</td>

              <td>Yesterday</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
