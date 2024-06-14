import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

const initialState = {
    status: null,
    user: null,
    token: null,
    regOk: null,
}

export const register = createAsyncThunk(
    'auth/register',
    async ({ username, password, tel, adress }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                username,
                password,
                tel,
                adress,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
        try {
            const { data } = await axios.post('/auth/login', {
                username,
                password,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getMe = createAsyncThunk('auth/getMe', async () => {
    try {
        const { data } = await axios.get('auth/me')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.status = null
            state.user = null
            state.token = null
        },
        resetStatus: state => {
            state.status = null
            state.regOk = null
        },
    },
    extraReducers: builder => {
        // Register
        builder.addCase(register.pending, state => {
            state.status = null
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.regOk = action.payload.newUser ? true : false
            state.status = action.payload.message
            state.user = action.payload.newUser
        })
        builder.addCase(register.rejected, (state, action) => {
            state.status = action.payload.message
        })

        // Login
        builder.addCase(login.pending, state => {
            state.status = null
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        })
        builder.addCase(login.rejected, (state, action) => {
            state.status = action.payload.message
        })

        // Get Me
        builder.addCase(getMe.pending, state => {
            state.status = null
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.status = action.payload.message
        })
    },
})

export const checkAuth = state => Boolean(state.auth.token)
export const { logout, resetStatus } = authSlice.actions
export default authSlice.reducer
