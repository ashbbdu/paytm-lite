
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    bankBalance : null
};
const bankSlice = createSlice({
    name : "bankSlice",
    initialState : initialState,
    reducers : {
        setBalance(state , action){
            state.bankBalance = action.payload;
        }
    }
})

export const { setBalance } = bankSlice.actions;

export default bankSlice.reducer;