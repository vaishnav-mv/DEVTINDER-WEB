import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
            return state.filter(req=>req._id!==action.payload)
        },
        clearRequests:()=> []
    }
})

export const {addRequest,removeRequest,clearRequests}=requestSlice.actions
export default requestSlice.reducer