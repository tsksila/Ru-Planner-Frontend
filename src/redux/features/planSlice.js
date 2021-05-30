import {createSlice} from '@reduxjs/toolkit'

export const planSlice = createSlice({
    name:'plan' ,
    initialState:{
        termList : []
    },

    reducers:{
        test:(state ,action) => {

        }
    }


})


export const { test } = planSlice.actions


export default planSlice.reducer