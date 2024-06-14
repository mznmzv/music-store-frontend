import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import releaseSlice from './features/releaseSlice'
import dealSlice from './features/dealSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        release: releaseSlice,
        deal: dealSlice,
    },
})
