import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";


export const counterSlice = createSlice({
    name : "music",
    initialState,
    reducers : {
    }

})

export const musicReducer = counterSlice.reducer; 