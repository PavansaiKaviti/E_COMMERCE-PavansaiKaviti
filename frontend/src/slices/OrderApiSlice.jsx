import { ODERS_URL, PAYPAL_URL } from "../Constants";
import apiSlice from "./Apislices";

const OderapiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendCartItems: builder.mutation({
      query: (data) => ({
        url: ODERS_URL,
        method: "POST",
        body: data, //check here
      }),
    }),
    FetchOrder: builder.query({
      query: (id) => ({
        url: `${ODERS_URL}/myOrders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    PayOrder: builder.mutation({
      query: ({ id, details }) => ({
        //!check here distructure
        url: `${ODERS_URL}/myOrders/${id}/paid`,
        method: "PUT",
        body: details,
      }),
    }),
    GetPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    GetUserOrders: builder.query({
      query: () => ({
        url: `${ODERS_URL}/myOrders`,
      }),
      keepUnusedDataFor: 5,
    }),
    GetAllOders: builder.query({
      query: () => ({
        url: ODERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    Delivery: builder.mutation({
      query: (id) => ({
        //!check here distructure
        url: `${ODERS_URL}/myOrders/${id}/delivered`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useSendCartItemsMutation,
  useFetchOrderQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useGetUserOrdersQuery,
  useGetAllOdersQuery,
  useDeliveryMutation,
} = OderapiSlice;
