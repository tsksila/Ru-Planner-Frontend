import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user' ,
    initialState:{
        user:null
    },

    reducers:{
        login:(state ,action) => {
            state.user = action.payload;
            localStorage.setItem('user_data', JSON.stringify(action.payload))

        },
        logout:(state) => {
            state.user = null;
            localStorage.removeItem('user_data')   
        }
    }


})


export const { login ,logout} = userSlice.actions

export const selectUser = (state) => state.user.user
export const userLoggedIn = () => {
    if (localStorage.getItem('user_data')) {
        return true
    }else{
        return false
    }
}


export default userSlice.reducer