import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {cartState: CartState, usersState: UsersState}
export type AppDispatch = typeof store.dispatch;

// Exporting the whole store to use in conjunction with loaders in pages. It's needed to define the type of loaders.
export default store;
export type StoreType = typeof store;
