"use client";
import Header from "@/app/components/admin/Header";
import StatCard from "@/app/components/admin/StartCart";
import { useGetAdminOrdersQuery, useGetAdminSummaryQuery } from "@/lib/api/api";

export default function Dashboard() {
  const {
    data: summaryResponse,
    isLoading: summaryLoading,
    isError: summaryError,
  } = useGetAdminSummaryQuery();
  const { data: ordersResponse, isLoading: ordersLoading } =
    useGetAdminOrdersQuery();
  const summary = summaryResponse?.data;
  const orders = ordersResponse?.data || [];

  return (
    <main className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      <Header />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Revenue"
          value={
            summaryLoading
              ? "..."
              : `৳${Number(summary?.revenue || 0).toLocaleString()}`
          }
          color="text-[#6C3FEA]"
        />

        <StatCard
          title="Orders"
          value={summaryLoading ? "..." : (summary?.orders ?? 0)}
          color="text-[#101827]"
        />

        <StatCard
          title="Users"
          value={summaryLoading ? "..." : (summary?.users ?? 0)}
          color="text-[#101827]"
        />

        <StatCard
          title="Products"
          value={summaryLoading ? "..." : (summary?.products ?? 0)}
          color="text-[#101827]"
        />
      </div>

      {summaryError && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          Dashboard totals could not be loaded.
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="flex min-h-80 flex-col justify-center border border-[#E5E7EB] bg-white p-8 shadow-[0_8px_24px_rgba(16,24,39,0.04)] lg:col-span-2">
          <h2 className="text-xl font-extrabold text-slate">Sales overview</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray">
            Revenue shown above is calculated from saved orders. A sales
            timeline is not available because the server does not yet expose
            historical sales analytics.
          </p>
        </div>

        <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
          <h2 className="mb-5 text-xl font-extrabold text-slate">
            Latest orders
          </h2>
          {ordersLoading ? (
            <p className="text-sm text-gray">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-gray">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order._id}
                  className="flex justify-between gap-3 border-b border-border pb-3 text-sm last:border-0"
                >
                  <span className="min-w-0 truncate text-gray">
                    {order.user?.fullname ||
                      order.user?.email ||
                      order.orderNumber}
                  </span>
                  <span className="shrink-0 font-semibold text-slate">
                    ৳{Number(order.totalPrice || 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 overflow-hidden border border-[#E5E7EB] bg-white p-4 text-gray sm:p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
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
              {orders.slice(0, 5).map((order) => (
                <tr className="border-b" key={order._id}>
                  <td className="py-4">
                    {order.user?.fullname || order.user?.email || "Customer"}
                  </td>
                  <td className="capitalize">{order.status}</td>
                  <td>৳{Number(order.totalPrice || 0).toLocaleString()}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {!ordersLoading && orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-5 text-gray">
                    No orders recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
