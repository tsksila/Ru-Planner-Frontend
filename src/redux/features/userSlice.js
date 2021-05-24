import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user' ,
    initialState:{
        user:null
    },

    reducers:{
        login:(state ,action) => {
            state.user = action.payload;
            

            localStorage.setItem('user_id', action.payload.user_id)
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('loggedIn', true)

        },
        logout:(state) => {
            state.user = null;
            localStorage.removeItem('user_id')   
            localStorage.removeItem('username')   
            localStorage.removeItem('accessToken')   
            localStorage.removeItem('loggedIn')
        }
    }


})


export const { login ,logout} = userSlice.actions

export const selectUser = (state) => state.user.user



export default userSlice.reducer