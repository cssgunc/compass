import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/utils/constants';

interface UserState {
    isLoggedIn: boolean;
    userType?: User;
}

const initialState: UserState = {
    isLoggedIn: false,
    userType: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<{ userType: User}>) => {
            state.isLoggedIn = true;
            state.userType = action.payload.userType;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.userType = undefined;
        }
    },
});

export const {logIn, logOut} = userSlice.actions;

export default userSlice.reducer;