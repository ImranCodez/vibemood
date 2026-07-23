
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminApiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (build) => ({
    getproducts: build.query({
      query: () => "/product/getproduct",
    }),
    GetCategories: build.query({
      query: () => "/category/getall",
    }),
  }),
});

export const {useGetproductsQuery,useGetCategoriesQuery}= AdminApiService;
