"use client";

import { useState } from "react";
import { Search, Users } from "lucide-react";
import { useGetAdminUsersQuery } from "@/lib/api/api";

export default function UsersPage() {
  const { data: response, isLoading, isError } = useGetAdminUsersQuery();
  const [search, setSearch] = useState("");
  const users = response?.data || [];
  const filteredUsers = users.filter((user) =>
    `${user.fullname || ""} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const verifiedUsers = users.filter((user) => user.isVerified).length;
  const adminUsers = users.filter((user) => user.role === "admin").length;

  return (
    <main className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6C3FEA]">
            People
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate">
            Users
          </h1>
          <p className="mt-1 text-gray">
            View customers and manage account access.
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-gray">Total users</p>
          <p className="mt-2 text-2xl font-bold text-slate">{users.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-gray">Verified accounts</p>
          <p className="mt-2 text-2xl font-bold text-slate">{verifiedUsers}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-gray">Admin accounts</p>
          <p className="mt-2 text-2xl font-bold text-slate">{adminUsers}</p>
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
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-170 text-left text-sm">
            <thead className="bg-background text-gray">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-gray">
                    Loading users...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-red-700">
                    Could not load users.
                  </td>
                </tr>
              )}
              {!isLoading &&
                !isError &&
                filteredUsers.map((user) => (
                  <tr className="border-t border-border" key={user._id}>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate">
                        {user.fullname || "Unnamed user"}
                      </p>
                      <p className="text-gray">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-slate">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${user.isVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                      >
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                  </tr>
                ))}
              {!isLoading && !isError && filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-gray">
                    No matching users.
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
