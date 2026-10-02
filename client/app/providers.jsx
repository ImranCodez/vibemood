"use client";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "@/lib/api/api";

export default function Providers({ children }) {
  return <ApiProvider api={api}>{children}</ApiProvider>;
}
