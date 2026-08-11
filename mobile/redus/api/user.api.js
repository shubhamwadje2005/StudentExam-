import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            userExamCheck: builder.mutation({
                query: examData => {
                    return {
                        url: "/user-exam-check",
                        method: "POST",
                        body: examData
                    }
                },
                invalidatesTags: ["user"]
            }),

            getUsersResults: builder.query({
                query: () => {
                    return {
                        url: "/result",
                        method: "GET",
                    }
                },
                providesTags: ["user"]
            }),

            getUserExamPaper: builder.query({
                query: questionId => {
                    return {
                        url: "/user-exam-fetch",
                        method: "GET",
                        params: { questionId }
                    }
                },
                providesTags: ["user"]
            }),

            getExamTime: builder.query({
                query: () => {
                    return {
                        url: "/get-exam-time",
                        method: "GET",
                    }
                },
                providesTags: ["user"]
            }),

        }
    }
})

export const {
    useUserExamCheckMutation,
    useGetUserExamPaperQuery,
    useLazyGetUserExamPaperQuery,
    useGetUsersResultsQuery,
    useGetExamTimeQuery
} = userApi
