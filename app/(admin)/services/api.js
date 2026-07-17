import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AdminApiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (build) => ({
    getproducts: build.query({
      query: () => "/product/getproduct",
    }),
  }),
});

export const {useGetproductsQuery}= AdminApiService;
