"use client";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { AdminApiService } from "./services/api";

export default function Providers({ children }) {
  return (
    <ApiProvider api={AdminApiService}>
      {children}
    </ApiProvider>
  );
}