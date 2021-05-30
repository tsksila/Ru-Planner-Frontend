import { configureStore } from "@reduxjs/toolkit";

import userReducer from './features/userSlice'
import planReducer from './features/planSlice'



export const store = configureStore({
  reducer: {
    user: userReducer,
    plan: planReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
