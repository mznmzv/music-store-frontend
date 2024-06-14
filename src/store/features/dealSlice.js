import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

const initialState = {
    newDeal: null,
    dealStatus: null,
    dealList: null,
    isOk: null,
}

export const createSellDeal = createAsyncThunk(
    'deal/createSellDeal',
    async params => {
        try {
            const { data } = await axios.post('/deal/new', params)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const createBuyDeal = createAsyncThunk(
    'deal/createBuyDeal',
    async params => {
        try {
            const { data } = await axios.post('/deal/buy', params)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteDeal = createAsyncThunk(
    'deal/deleteDeal',
    async releaseId => {
        try {
            const { data } = await axios.post('/deal/delete', {
                releaseId,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getUserDeals = createAsyncThunk('deal/getUserDeals', async () => {
    try {
        const { data } = await axios.get('/deal')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const dealSlice = createSlice({
    name: 'deal',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Sell release
        builder.addCase(createSellDeal.pending, state => {
            state.dealStatus = null
        })
        builder.addCase(createSellDeal.fulfilled, (state, action) => {
            state.dealStatus = action.payload.message
            state.newDeal = action.payload.newDeal
        })
        builder.addCase(createSellDeal.rejected, (state, action) => {
            state.dealStatus = action.payload.message
        })

        // Buy release
        builder.addCase(createBuyDeal.pending, state => {
            state.dealStatus = null
        })
        builder.addCase(createBuyDeal.fulfilled, (state, action) => {
            state.dealStatus = action.payload.message
            state.newDeal = action.payload.newDeal
        })
        builder.addCase(createBuyDeal.rejected, (state, action) => {
            state.dealStatus = action.payload.message
        })

        // Delete deal
        builder.addCase(deleteDeal.pending, state => {
            state.dealStatus = null
        })
        builder.addCase(deleteDeal.fulfilled, (state, action) => {
            state.dealStatus = action.payload.message
            state.newDeal = action.payload.deal
        })
        builder.addCase(deleteDeal.rejected, (state, action) => {
            state.dealStatus = action.payload.message
        })

        // Get user's deals
        builder.addCase(getUserDeals.pending, state => {
            state.dealStatus = null
        })
        builder.addCase(getUserDeals.fulfilled, (state, action) => {
            state.dealStatus = action.payload.message
            state.dealList = action.payload
        })
        builder.addCase(getUserDeals.rejected, (state, action) => {
            state.dealStatus = action.payload.message
        })
    },
})

export default dealSlice.reducer
