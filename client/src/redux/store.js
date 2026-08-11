import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./api/auth.api"
import authSlice from "./slice/auth.slice"
import { adminApi } from "./api/admin.api"
import { userApi } from "./api/user.api"


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, adminApi.middleware, userApi.middleware]
})

export default reduxStore