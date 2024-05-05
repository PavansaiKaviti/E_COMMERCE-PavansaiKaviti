import { PRODUCTS_URL } from "../Constants";
import apiSlice from "./Apislices";

const ProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: PRODUCTS_URL,
        params: {
          pageNumber,
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    CreateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/Private/Admin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    EditProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${PRODUCTS_URL}/Edit/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    DeleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/ProductDelete/${id}`,
        method: "DELETE",
      }),
    }),
    TopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/highrating`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useTopProductsQuery,
} = ProductApiSlice;
