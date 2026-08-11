import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const mobileAuthApi = createApi({
    reducerPath: "mobileAuthApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            mobileRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-mobile-register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            otpSendUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/otp-send",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            mobileLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-mobile-login",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            mobileLogout: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-mobile-logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const {
    useMobileRegisterMutation,
    useOtpSendUserMutation,
    useMobileLoginMutation,
    useMobileLogoutMutation
} = mobileAuthApi
