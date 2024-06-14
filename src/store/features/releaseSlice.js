import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

const initialState = {
    marketList: null,
    releaseList: null,
    newRelease: null,
    releaseStatus: null,
    typeModal: null,
}

export const addRelease = createAsyncThunk(
    'release/addRelease',
    async params => {
        try {
            const { data } = await axios.post('/release/new', params)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const editRelease = createAsyncThunk(
    'release/editRelease',
    async params => {
        try {
            const { data } = await axios.post('/release/edit', params)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteRelease = createAsyncThunk(
    'release/deleteRelease',
    async releaseId => {
        try {
            const { data } = await axios.post('release/delete', { releaseId })
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getCollection = createAsyncThunk(
    'release/getCollection',
    async () => {
        try {
            const { data } = await axios.get('release/collection')
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getReleaseById = createAsyncThunk(
    'release/getReleaseById',
    async id => {
        try {
            const { data } = await axios.get(`/release/${id}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getMarketProducts = createAsyncThunk(
    'release/getMarketProducts',
    async () => {
        try {
            const { data } = await axios.get('/release/market')
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const releaseSlice = createSlice({
    name: 'release',
    initialState,
    reducers: {
        setModalType(state, action) {
            state.typeModal = action.payload
        },
        resetRelease(state) {
            state.newRelease = null
        },
    },
    extraReducers: builder => {
        // Add release to user's collection
        builder.addCase(addRelease.pending, state => {
            state.releaseStatus = null
        })
        builder.addCase(addRelease.fulfilled, (state, action) => {
            state.releaseStatus = action.payload.message
            state.newRelease = action.payload.newRelease
        })
        builder.addCase(addRelease.rejected, (state, action) => {
            state.releaseStatus = action.payload.message
        })

        // Edit release
        builder.addCase(editRelease.pending, state => {
            state.releaseStatus = null
        })
        builder.addCase(editRelease.fulfilled, (state, action) => {
            state.releaseStatus = action.payload.message
        })
        builder.addCase(editRelease.rejected, (state, action) => {
            state.releaseStatus = action.payload.message
        })

        // Delete release
        builder.addCase(deleteRelease.pending, state => {
            state.releaseStatus = null
        })
        builder.addCase(deleteRelease.fulfilled, (state, action) => {
            state.releaseStatus = action.payload.message
            state.newRelease = action.payload.release
        })
        builder.addCase(deleteRelease.rejected, (state, action) => {
            state.releaseStatus = action.payload.message
        })

        // Get user's collection
        builder.addCase(getCollection.pending, state => {
            state.releaseStatus = null
        })
        builder.addCase(getCollection.fulfilled, (state, action) => {
            state.releaseStatus = action.payload.message
            state.releaseList = action.payload
        })
        builder.addCase(getCollection.rejected, (state, action) => {
            state.releaseStatus = action.payload.message
        })

        // Get release by id
        builder.addCase(getReleaseById.pending, state => {
            state.releaseStatus = null
        })
        builder.addCase(getReleaseById.fulfilled, (state, action) => {
            state.releaseStatus = action.payload.message
            let [res] = action.payload
            state.newRelease = res
        })
        builder.addCase(getReleaseById.rejected, (state, action) => {
            state.releaseStatus = action.payload.message
        })

        // Get all products on the market
        builder.addCase(getMarketProducts.pending, state => {
            state.releaseStatus = null
        })
        builder.addCase(getMarketProducts.fulfilled, (state, action) => {
            state.releaseStatus = action.payload.message
            state.marketList = action.payload
        })
        builder.addCase(getMarketProducts.rejected, (state, action) => {
            state.releaseStatus = action.payload.message
        })
    },
})

export const { setModalType, resetRelease } = releaseSlice.actions
export default releaseSlice.reducer
