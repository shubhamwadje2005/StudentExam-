import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth", credentials: "include" }),
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`, credentials: "include" }),
    endpoints: (builder) => {
        return {
            userRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-register",
                        method: "POST",
                        body: userData
                    }
                },
            }),


            userLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data))
                    return data
                }
            }),


            userLogout: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("user")
                    return data.result
                }
            }),

            //     query: adminData => {
            //         return {
            //             url: "/admin-register",
            //             method: "POST",
            //             body: adminData
            //         }
            //     },
            // }),


            // adminSendOTP: builder.mutation({
            //     query: adminData => {
            //         return {
            //             url: "/admin-sendotp",
            //             method: "POST",
            //             body: adminData
            //         }
            //     },
            // }),


            adminLogin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/admin-login",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data))
                    return data
                }
            }),


            adminLogout: builder.mutation({
                query: adminData => {
                    return {
                        url: "/admin-logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data
                }
            }),
        }
    }
})

export const {
    useUserRegisterMutation,
    useUserLoginMutation,
    useUserLogoutMutation,


    useAdminLoginMutation,
    useAdminLogoutMutation
} = authApi
