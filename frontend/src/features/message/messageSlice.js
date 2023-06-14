import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
    messages: [],
    isLoading: false,
    isError: false,
    message: ''
}

export const createMessage = createAsyncThunk(
    'message/create',
    async (messageData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await messageService.createMessage(messageData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const fetchMessages = createAsyncThunk(
    'messages/fetchAll',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await messageService.fetchMessages(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.messages.push(action.payload)
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.messages = action.payload
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})
export const { reset } = messageSlice.actions
export default messageSlice.reducer