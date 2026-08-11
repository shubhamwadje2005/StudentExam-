import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getPaper: builder.query({
                query: examId => {
                    return {
                        url: "/exam-fetch",
                        method: "GET",
                        params: { examId }
                    }
                },
                providesTags: ["admin"]
            }),
            examName: builder.query({
                query: () => {
                    return {
                        url: "/exam-name",
                        method: "GET",
                    }
                },
                providesTags: ["admin"]
            }),
            getExamTime: builder.query({
                query: () => {
                    return {
                        url: "/get-time-details/",
                        method: "GET",
                    }
                },
                providesTags: ["admin"]
            }),
            resultGet: builder.query({
                query: examId => {

                    return {
                        url: `/user-results/${examId}`,
                        method: "GET",
                        // params: { examId }
                    }
                },
                providesTags: ["admin"]
            }),

            createTime: builder.mutation({
                query: examData => {
                    return {
                        url: "/exam-time",
                        method: "POST",
                        body: examData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            createExam: builder.mutation({
                query: examData => {
                    return {
                        url: "/exam-create",
                        method: "POST",
                        body: examData,
                    };
                },
                invalidatesTags: ["admin"],
            }),

            updateExam: builder.mutation({
                query: examData => {
                    return {
                        url: "/exam-update/" + examData._id,
                        method: "PATCH",
                        body: examData
                    }
                },
                invalidatesTags: ["admin"]
            }),


            deleteExam: builder.mutation({
                query: _id => {
                    return {
                        url: "/exam-delete/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),


            deleteTimeExam: builder.mutation({
                query: _id => {
                    return {
                        url: "/delete-exam-time/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),

            updateTimeExam: builder.mutation({
                query: examData => {
                    return {
                        url: "/update-exam-time/" + examData._id,
                        method: "PATCH",
                        body: examData
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const {
    useCreateExamMutation,
    useLazyGetPaperQuery,
    useDeleteExamMutation,
    useUpdateExamMutation,
    useCreateTimeMutation,
    useExamNameQuery,
    useLazyGetExamTimeQuery,
    useResultGetQuery,
    useLazyResultGetQuery,

    useDeleteTimeExamMutation,
    useUpdateTimeExamMutation
} = adminApi
