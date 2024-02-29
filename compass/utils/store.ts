// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';

export const makeStore = () => configureStore({
    reducer: {
        user: userSlice,
    },
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
