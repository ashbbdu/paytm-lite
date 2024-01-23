
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    signupData: null,
    loading: false,
    user : [],
    token: localStorage.getItem("token") || ""
};
const userSlice = createSlice({
    name : "userSlice",
    initialState : initialState,
    reducers : {
        setSignupData(state , action){
            state.signupData = action.payload;
        },
        setLoading(state , action){
            state.loading = action.payload;
        },
        setToken(state , action){
            state.token = action.payload
        },
        setUser(state , action) {
            state.user =  action.payload 
        }
    }
})

export const { setSignupData, setLoading, setToken , setUser } = userSlice.actions;

export default userSlice.reducer;