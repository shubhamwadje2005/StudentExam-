import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")),
        admin: JSON.parse(localStorage.getItem("admin"))
    },
    reducers: {},

    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.userLogin.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
        .addMatcher(authApi.endpoints.userLogout.matchFulfilled, (state, { payload }) => {
            state.user = null
        })


        .addMatcher(authApi.endpoints.adminLogin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.adminLogout.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
})

export const { invalidate } = authSlice.actions
export default authSlice.reducer