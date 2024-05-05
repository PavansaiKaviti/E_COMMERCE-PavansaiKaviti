import { REVIEW_URL } from "../Constants";
import apiSlice from "./Apislices";

const ReviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateReview: builder.mutation({
      query: ({ id, Commentdata }) => ({
        url: `${REVIEW_URL}/review/${id}`,
        method: "POST",
        body: Commentdata,
      }),
      invalidatesTags: ["Product"],
    }),
    GetReview: builder.query({
      query: (id) => ({
        url: `${REVIEW_URL}/review/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    EditReview: builder.mutation({
      query: ({ id, Commentdata }) => ({
        url: `${REVIEW_URL}/reviewEdit/${id}`,
        method: "PUT",
        body: Commentdata,
      }),
    }),
    DeleteReview: builder.mutation({
      query: (id) => ({
        url: `${REVIEW_URL}/reviewDelete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewQuery,
  useEditReviewMutation,
  useDeleteReviewMutation,
} = ReviewApiSlice;
