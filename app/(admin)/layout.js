"use client";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { AdminApiService } from "./services/api";
import Sidebar from "../components/admin/SideNavbar";

export default function Providers({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="container">
        <ApiProvider api={AdminApiService}>{children}</ApiProvider>
      </main>
    </div>
  );
}
