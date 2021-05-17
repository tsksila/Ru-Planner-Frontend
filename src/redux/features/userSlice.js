import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user' ,
    initialState:{
        user:null
    },
    reducers:{
        login:(state ,action) => {
            state.user = action.payload;
            localStorage.setItem('accessToken' , JSON.stringify(action.payload.accessToken))
            localStorage.setItem('LoggedIn' , JSON.stringify(action.payload.loggedIn))
            localStorage.setItem('userID' , JSON.stringify(action.payload.id))
        },
        logout:(state) => {
            state.user = null;
        }
    }


})


export const { login ,logout} = userSlice.actions

export const selectUser = (state) => state.user.user 
export default userSlice.reducer