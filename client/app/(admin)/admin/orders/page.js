"use client";

import { useMemo, useState } from "react";
import { Boxes, Download, Search } from "lucide-react";
import { useGetAdminOrdersQuery } from "@/lib/api/api";

const EMPTY_ORDERS = [];

const statusStyle = {
  Delivered: "bg-[#6C3FEA] text-white",
  Processing: "bg-[#F1EDFF] text-[#6C3FEA]",
  Pending: "bg-gray-soft text-gray",
  Cancelled: "bg-[#101827] text-white",
};

export default function OrdersPage() {
  const { data: response, isLoading, isError } = useGetAdminOrdersQuery();
  const [search, setSearch] = useState("");
  const orders = response?.data || EMPTY_ORDERS;
  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter((order) =>
      [order.orderNumber, order.user?.fullname, order.user?.email, order.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [orders, search]);
  const exportOrders = () => {
    const rows = [
      ["Order", "Customer", "Email", "Date", "Total", "Status"],
      ...filteredOrders.map((order) => [
        order.orderNumber,
        order.user?.fullname || "",
        order.user?.email || "",
        new Date(order.createdAt).toISOString(),
        order.totalPrice,
        order.status,
      ]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "vibemood-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  };
  const statusCounts = orders.reduce((counts, order) => {
    const status = order.status || "pending";
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  return (
    <main className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6C3FEA]">
            Sales
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate">
            Orders
          </h1>
          <p className="mt-1 text-gray">
            Track and manage every customer order.
          </p>
        </div>
        <button
          onClick={exportOrders}
          disabled={!orders.length}
          className="inline-flex items-center justify-center gap-2 bg-[#101827] px-4 py-3 text-sm font-bold text-white hover:bg-[#6C3FEA] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={17} /> Export orders
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          `All orders|${orders.length}`,
          `Pending|${statusCounts.pending || 0}`,
          `Confirmed|${statusCounts.confirmed || 0}`,
          `Shipped|${statusCounts.shipped || 0}`,
          `Delivered|${statusCounts.delivered || 0}`,
          `Cancelled|${statusCounts.cancelled || 0}`,
        ].map((item) => {
          const [label, value] = item.split("|");
          return (
            <div
              className="border border-[#E5E7EB] bg-white p-5 shadow-[0_8px_24px_rgba(16,24,39,0.04)]"
              key={label}
            >
              <p className="text-sm text-gray">{label}</p>
              <p className="mt-2 text-2xl font-bold text-slate">{value}</p>
            </div>
          );
        })}
      </div>

      <section className="mt-6 overflow-hidden border border-[#E5E7EB] bg-white shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate">
            <Boxes size={20} /> Recent orders
          </h2>
          <label className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
            <input
              className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none focus:border-slate"
              placeholder="Search orders"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-170 text-left text-sm">
            <thead className="bg-background text-gray">
              <tr>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-gray">
                    Loading orders...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-red-700">
                    Could not load orders.
                  </td>
                </tr>
              )}
              {!isLoading &&
                !isError &&
                filteredOrders.map((order) => (
                  <tr
                    className="border-t border-border text-slate"
                    key={order._id}
                  >
                    <td className="px-6 py-4 font-semibold">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4">
                      {order.user?.fullname || order.user?.email || "Customer"}
                    </td>
                    <td className="px-6 py-4 text-gray">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ৳ {Number(order.totalPrice || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[order.status?.[0]?.toUpperCase() + order.status?.slice(1)] || statusStyle.Pending}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              {!isLoading && !isError && filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-gray">
                    No matching orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
