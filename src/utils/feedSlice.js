import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeFeedUser: (state, action) => {
            state.data = state.data.filter(user => user._id !== action.payload);
        },
        clearFeed: () => null
    }
})

export const { addFeed, removeFeedUser, clearFeed } = feedSlice.actions
export default feedSlice.reducer