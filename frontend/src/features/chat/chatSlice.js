import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import chatService from './chatService'

const initialState = {
    chats: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''

}

export const fetchChats = createAsyncThunk(
    'chats/fetchAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await chatService.fetchChats(token)
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
);

export const createChat = createAsyncThunk(
    'chats/create',
    async (chatData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await chatService.createChat(chatData, token)
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

export const createGroup = createAsyncThunk(
    'group/create',
    async (groupData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await chatService.createGroup(groupData, token)
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

export const updateRename = createAsyncThunk(
    'rename/update',
    async (chatData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await chatService.updateRename(chatData, token)
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

export const updateAddUser = createAsyncThunk(
    'AddUser/update',
    async (chatData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await chatService.updateAddUser(chatData, token)
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

export const removeFromGroup = createAsyncThunk(
    'removeUser/update',
    async (chatData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await chatService.removeFromGroup(chatData, token)
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

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats = action.payload
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createChat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats.push(action.payload)
            })
            .addCase(createChat.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createGroup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.chats.push(action.payload)
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateRename.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateRename.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const index = state.chats.findIndex((chat) => chat._id === updateRename._id);
                if (index !== -1) {
                    state.chats[index] = updateRename;
                }
            })
            .addCase(updateRename.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateAddUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateAddUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const index = state.chats.findIndex((chat) => chat._id === updateRename._id);
                if (index !== -1) {
                    state.chats[index] = updateRename;
                }
            })
            .addCase(updateAddUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeFromGroup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeFromGroup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const index = state.chats.findIndex((chat) => chat._id === updateRename._id);
                if (index !== -1) {
                    state.chats[index] = updateRename;
                }
            })
            .addCase(removeFromGroup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
});

export const { reset } = chatSlice.actions
export default chatSlice.reducer