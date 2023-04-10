import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.254:7000/",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.accessToken;
  
      if (token) {
           headers.set("Authorization", `Bearer ${token}`);
          // headers.set("Authorization", `${token}`);
      }
      return headers;
  },
  }),
  tagTypes: ["categoryproducts", "Products", "Discount", "Coupon", "Product","RelatedProducts"],
  endpoints: (builder) => ({}),
});

//tokens are generated in the form of JWT
//Has we all considered we are allocated