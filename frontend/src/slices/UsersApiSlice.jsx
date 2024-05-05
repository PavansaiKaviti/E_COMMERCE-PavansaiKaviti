import apiSlice from "./Apislices";
import { USERS_URL } from "../Constants";

const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/Login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/Logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/Register`,
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/Profile`,
      }),
      keepUnusedDataFor: 5,
    }),
    userupdate: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/UpdateUser`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    DeleteAuser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    adminUserupdate: builder.mutation({
      query: ({ id, userData }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    singleuserAdmin: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUserupdateMutation,
  useGetAllUsersQuery,
  useDeleteAuserMutation,
  useAdminUserupdateMutation,
  useSingleuserAdminQuery,
} = UserApiSlice;
