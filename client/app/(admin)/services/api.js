import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refreshtoken",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // retry original request
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
export const AdminApiService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    getproducts: build.query({
      query: () => "/product/getproduct",
    }),
    GetCategories: build.query({
      query: () => "/category/getall",
    }),
    createNewproduct: build.mutation({
      query: (productdata) => {
        const formData = new FormData();

        Object.entries(productdata).forEach(([key, value]) => {
          if (key === "thumbnail" && value) {
            formData.append(key, value);
          } else if (key === "images") {
            value.forEach((image) => formData.append(key, image));
          } else if (key === "variants") {
            formData.append(key, JSON.stringify(value));
          } else if (key === "tags") {
            formData.append(
              key,
              value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
                .join(","),
            );
          } else if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });

        return {
          url: "/product/create",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useGetproductsQuery,
  useGetCategoriesQuery,
  useCreateNewproductMutation,
} = AdminApiService;
