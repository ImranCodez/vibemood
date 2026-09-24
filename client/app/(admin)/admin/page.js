"use client";
import Header from "@/app/components/admin/Header";
import StatCard from "@/app/components/admin/StartCart";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] p-4 sm:p-6 lg:p-8">
      <Header />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Revenue" value="৳18,420" color="text-[#ef6c2f]" />

        <StatCard title="Orders" value="520" color="text-[#151515]" />

        <StatCard title="Customers" value="1,250" color="text-[#151515]" />

        <StatCard title="Products" value="83" color="text-[#151515]" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="flex min-h-80 items-center justify-center border border-[#e5e2dc] bg-white text-xl font-extrabold text-[#77746f] shadow-[0_8px_24px_rgba(21,21,21,0.04)] lg:col-span-2">
          Sales Chart
        </div>

        <div className="border border-[#e5e2dc] bg-white p-6 shadow-[0_8px_24px_rgba(21,21,21,0.04)]">
          <h2 className="mb-5 text-xl font-extrabold text-slate">
            Top Products
          </h2>

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

      <div className="mt-8 overflow-hidden border border-[#e5e2dc] bg-white p-4 text-gray sm:p-6 shadow-[0_8px_24px_rgba(21,21,21,0.04)]">
        <h2 className="mb-5 text-xl font-extrabold text-slate">
          Recent Orders
        </h2>

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
