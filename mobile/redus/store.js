import { configureStore } from "@reduxjs/toolkit";
import { mobileAuthApi } from "./api/auth.api";
import mobileAuthSlice from './slice/auth.slice'
import { userApi } from "./api/user.api";
import { adminApi } from "./api/admin.api";


const reduxStore = configureStore({
    reducer: {
        [mobileAuthApi.reducerPath]: mobileAuthApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        auth: mobileAuthSlice
    },
    middleware: def => [...def(), mobileAuthApi.middleware, userApi.middleware, adminApi.middleware]
})

export default reduxStore