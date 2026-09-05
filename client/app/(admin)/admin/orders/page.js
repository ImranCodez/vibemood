import { Boxes, Download, Search } from "lucide-react";

const orders = [
  {
    id: "#VM-1048",
    customer: "John Doe",
    date: "Aug 23, 2026",
    total: "$120.00",
    status: "Delivered",
  },
  {
    id: "#VM-1047",
    customer: "Alex Morgan",
    date: "Aug 22, 2026",
    total: "$220.00",
    status: "Processing",
  },
  {
    id: "#VM-1046",
    customer: "Sarah Wilson",
    date: "Aug 21, 2026",
    total: "$89.00",
    status: "Pending",
  },
  {
    id: "#VM-1045",
    customer: "Michael Chen",
    date: "Aug 20, 2026",
    total: "$340.00",
    status: "Cancelled",
  },
];

const statusStyle = {
  Delivered: "bg-slate text-white",
  Processing: "bg-gray-soft text-slate",
  Pending: "bg-gray-soft text-gray",
  Cancelled: "bg-slate-dark text-white",
};

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray">
            Sales
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate">Orders</h1>
          <p className="mt-1 text-gray">
            Track and manage every customer order.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate px-4 py-3 text-sm font-semibold text-text-light hover:bg-slate-light">
          <Download size={17} /> Export orders
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          "All orders|248",
          "Processing|32",
          "Delivered|198",
          "Cancelled|18",
        ].map((item) => {
          const [label, value] = item.split("|");
          return (
            <div
              className="rounded-xl border border-border bg-surface p-5"
              key={label}
            >
              <p className="text-sm text-gray">{label}</p>
              <p className="mt-2 text-2xl font-bold text-slate">{value}</p>
            </div>
          );
        })}
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate">
            <Boxes size={20} /> Recent orders
          </h2>
          <label className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
            <input
              className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none focus:border-slate"
              placeholder="Search orders"
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
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
              {orders.map((order) => (
                <tr
                  className="border-t border-border text-slate"
                  key={order.id}
                >
                  <td className="px-6 py-4 font-semibold">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-gray">{order.date}</td>
                  <td className="px-6 py-4 font-semibold">{order.total}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
