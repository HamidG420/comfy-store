import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { User, UserActionPayload, UserState } from '../../interfaces';

const enum themes {
  pastel = 'pastel',
  night = 'night',
}

const getThemeFromLocalStorage = function () {
  const theme = localStorage.getItem('theme') || themes.pastel;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const getUserFromLocalStorage = function (): User | null {
  const value = localStorage.getItem('user');
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserActionPayload>) => {
      const { user, jwt } = action.payload;
      state.user = { ...user, token: jwt };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      // localStorage.clear()
      toast.success('Logged out successfully');
    },
    toggleTheme: (state) => {
      state.theme = state.theme === themes.night ? themes.pastel : themes.night;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
