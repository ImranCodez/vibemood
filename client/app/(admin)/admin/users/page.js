import { Search, UserPlus, Users } from "lucide-react";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    orders: 12,
    status: "Active",
  },
  {
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "Customer",
    orders: 8,
    status: "Active",
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Customer",
    orders: 21,
    status: "Active",
  },
  {
    name: "Admin User",
    email: "admin@vibemood.com",
    role: "Admin",
    orders: 0,
    status: "Active",
  },
];

export default function UsersPage() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray">
            People
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate">Users</h1>
          <p className="mt-1 text-gray">
            View customers and manage account access.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate px-4 py-3 text-sm font-semibold text-text-light hover:bg-slate-light">
          <UserPlus size={17} /> Add user
        </button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-gray">Total users</p>
          <p className="mt-2 text-2xl font-bold text-slate">1,250</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-gray">Active today</p>
          <p className="mt-2 text-2xl font-bold text-slate">186</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-gray">New this month</p>
          <p className="mt-2 text-2xl font-bold text-slate">74</p>
        </div>
      </div>
      <section className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate">
            <Users size={20} /> All users
          </h2>
          <label className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
            <input
              className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none focus:border-slate"
              placeholder="Search users"
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-background text-gray">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-t border-border" key={user.email}>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate">{user.name}</p>
                    <p className="text-gray">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray">{user.role}</td>
                  <td className="px-6 py-4 text-slate">{user.orders}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate px-3 py-1 text-xs font-semibold text-text-light">
                      {user.status}
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
