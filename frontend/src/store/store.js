import { configureStore } from '@reduxjs/toolkit'
import bankSlice from './slices/bankSlice';
import userSlice from './slices/userSlice';
const store = configureStore({
    reducer : {
        user :  userSlice,
        bank : bankSlice
    }   
})

export default store;