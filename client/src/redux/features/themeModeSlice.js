import { createSlice } from '@reduxjs/toolkit';
// create slice -> collection of initial state + reducer Functions for user

export const themeModeSlice = createSlice({
    name: 'ThemeMode', //name of slice
    initialState: {
        themeMode: 'dark'
    },
    reducers: {
       setThemeMode: (state, action) => {
        state.themeMode = action.payload;
       }
    }
});

export const {
    setThemeMode
} = themeModeSlice.actions;

export default themeModeSlice.reducer;