import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeFeedUser: (state) => {
            if (!state || !state.data) return null;
            // remove the first user (you show only one card at a time)
            return { ...state, data: state.data.slice(1) };
        },
        clearFeed: () => null
    }
})

export const { addFeed,removeFeedUser,clearFeed} = feedSlice.actions
export default feedSlice.reducer