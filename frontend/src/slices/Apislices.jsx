import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../Constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Oder", "User"],
  endpoints: (builder) => ({}),
});
export default apiSlice;
