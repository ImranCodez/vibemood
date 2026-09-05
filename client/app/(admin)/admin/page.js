"use client";
import Header from "@/app/components/admin/Header";
import StatCard from "@/app/components/admin/StartCart";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <Header />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Revenue" value="$18,420" color="text-[#E17000]" />

        <StatCard title="Orders" value="520" color="text-blue-600" />

        <StatCard title="Customers" value="1,250" color="text-green-600" />

        <StatCard title="Products" value="83" color="text-red-600" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="flex min-h-80 items-center justify-center rounded-xl border border-border bg-surface text-xl font-bold text-gray lg:col-span-2">
          Sales Chart
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-5 text-xl font-bold text-slate">Top Products</h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-border pb-3 text-sm text-gray">
              <span>Nike Air Max</span>
              <span>152 Sold</span>
            </div>

            <div className="flex justify-between border-b border-border pb-3 text-sm text-gray">
              <span>Hoodie</span>
              <span>131 Sold</span>
            </div>

            <div className="flex justify-between border-b border-border pb-3 text-sm text-gray">
              <span>T-shirt</span>
              <span>120 Sold</span>
            </div>

            <div className="flex justify-between text-sm text-gray">
              <span>Cap</span>
              <span>98 Sold</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface p-4 text-gray sm:p-6">
        <h2 className="mb-5 text-xl font-bold text-slate">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-155 text-sm">
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
      </div>
    </main>
  );
}
