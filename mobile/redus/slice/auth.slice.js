import { createSlice } from "@reduxjs/toolkit";
import { mobileAuthApi } from "../api/auth.api";

const mobileAuthSlice = createSlice({
    name: "mobileAuthSlice",
    initialState: {
    },
    reducers: {
        setLoacal: (state, { payload }) => {
            state.user = payload
        }
    },
    extraReducers: builder => builder
        .addMatcher(mobileAuthApi.endpoints.mobileLogin.matchFulfilled, (state, { payload }) => {
            state.user = payload.result
        })
        .addMatcher(mobileAuthApi.endpoints.mobileLogout.matchFulfilled, (state, { payload }) => {
            state.user = null
        })

})

export const { invalidate } = mobileAuthSlice.actions
export default mobileAuthSlice.reducer