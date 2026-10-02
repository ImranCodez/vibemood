import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !api.endpoint.startsWith("refresh")) {
    const refreshResult = await baseQuery(
      { url: "/auth/refreshtoken", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshResult.data?.success) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

function toProductFormData(product) {
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (key === "images") {
      (Array.isArray(value) ? value : []).forEach((image) =>
        formData.append("images", image),
      );
    } else if (key === "variants" || key === "destroyImage") {
      formData.append(key, JSON.stringify(value));
    } else if (key === "tags" && Array.isArray(value)) {
      formData.append(key, value.join(","));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart", "Categories", "Orders", "Products", "Profile"],
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({ url: "/auth/signup", method: "POST", body }),
    }),
    verifyOtp: build.mutation({
      query: (body) => ({ url: "/auth/verifyOtp", method: "POST", body }),
    }),
    regenerateOtp: build.mutation({
      query: (body) => ({ url: "/auth/regenerateotp", method: "POST", body }),
    }),
    signIn: build.mutation({
      query: (body) => ({ url: "/auth/signin", method: "POST", body }),
    }),
    forgetPassword: build.mutation({
      query: (body) => ({ url: "/auth/forgetepass", method: "POST", body }),
    }),
    resetPassword: build.mutation({
      query: ({ token, newpass }) => ({
        url: `/auth/resetpass/${encodeURIComponent(token)}`,
        method: "PUT",
        body: { newpass },
      }),
    }),
    getProfile: build.query({
      query: () => "/auth/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: build.mutation({
      query: (profile) => {
        const body = new FormData();
        Object.entries(profile).forEach(([key, value]) => {
          if (value !== null && value !== undefined) body.append(key, value);
        });
        return { url: "/auth/profile", method: "PUT", body };
      },
      invalidatesTags: ["Profile"],
    }),
    refreshToken: build.mutation({
      query: () => ({ url: "/auth/refreshtoken", method: "POST" }),
    }),
    logout: build.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),

    getAdminSummary: build.query({
      query: () => "/admin/summary",
    }),
    getAdminOrders: build.query({
      query: () => "/admin/orders",
      providesTags: ["Orders"],
    }),
    getAdminUsers: build.query({
      query: () => "/admin/users",
    }),

    getProducts: build.query({
      query: (params = {}) => ({ url: "/product/getproduct", params }),
      providesTags: ["Products"],
    }),
    getProductBySlug: build.query({
      query: (slug) => `/product/prodcutdetails/${encodeURIComponent(slug)}`,
      providesTags: (result, error, slug) => [{ type: "Products", id: slug }],
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: "/product/create",
        method: "POST",
        body: toProductFormData(product),
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: ({ slug, ...product }) => ({
        url: `/product/update/${encodeURIComponent(slug)}`,
        method: "PUT",
        body: toProductFormData(product),
      }),
      invalidatesTags: ["Products"],
    }),

    getCategories: build.query({
      query: () => "/category/getall",
      providesTags: ["Categories"],
    }),
    createCategory: build.mutation({
      query: (category) => {
        const body = new FormData();
        Object.entries(category).forEach(([key, value]) => {
          if (value !== null && value !== undefined) body.append(key, value);
        });
        return { url: "/category/create", method: "POST", body };
      },
      invalidatesTags: ["Categories"],
    }),

    getCart: build.query({
      query: () => "/cart/getall",
      providesTags: ["Cart"],
    }),
    addToCart: build.mutation({
      query: (body) => ({ url: "/cart/add", method: "POST", body }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: build.mutation({
      query: (body) => ({ url: "/cart/update", method: "PUT", body }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: build.mutation({
      query: (body) => ({ url: "/cart/delete", method: "PUT", body }),
      invalidatesTags: ["Cart"],
    }),
    checkout: build.mutation({
      query: (body) => ({ url: "/order/checkout", method: "POST", body }),
      invalidatesTags: ["Cart", "Orders"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifyOtpMutation,
  useRegenerateOtpMutation,
  useSignInMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetAdminSummaryQuery,
  useGetAdminOrdersQuery,
  useGetAdminUsersQuery,
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useCheckoutMutation,
} = api;

export const AdminApiService = api;
export const useGetproductsQuery = useGetProductsQuery;
export const useCreateNewproductMutation = useCreateProductMutation;
