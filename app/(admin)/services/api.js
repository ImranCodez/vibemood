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
    createNewproduct: build.mutation({
      query: (productdata) => ({
        url: "/product/create",
        method: "POST",
        headers: { "Content-type": "multipart/form-data" },
        body: productdata,
      }),
    }),
  }),
});

export const {
  useGetproductsQuery,
  useGetCategoriesQuery,
  useCreateNewproductMutation,
} = AdminApiService;
