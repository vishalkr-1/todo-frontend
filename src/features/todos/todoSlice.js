// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiUrl = import.meta.env.VITE_API_URL;
// Define a service using a base URL and expected endpoints
export const prepareHeaders = (headers) => {
  const token = localStorage.getItem("token");

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
};
export const taskApi = createApi({
    reducerPath: 'taskApi',
    tagTypes: ["Tasks"],
    baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
      prepareHeaders,
   }),
  endpoints: (builder) => ({
    GetAllTasks: builder.query({
        query: () => `/`,
        providesTags: ["Tasks"],
    }),
      addTask: builder.mutation({
          query: (addTodo) => ({
              url: '/add-task',
            method: 'POST',
        body: addTodo,
          }),
           invalidatesTags: ["Tasks"],
      }),
      deleteTask: builder.mutation({
          query: (id) => ({
              url: `/delete-task/${id}`,
            method: 'DELETE',
      
          }),
           invalidatesTags: ["Tasks"],
      })
  }),
})


export const { useGetAllTasksQuery,useAddTaskMutation ,useDeleteTaskMutation} = taskApi