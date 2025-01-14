import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  token: string | null;
}

const USER_STORAGE_KEY = "wish-list-user";

const loadStateFromLocalStorage = (): UserState => {
  const state = localStorage.getItem(USER_STORAGE_KEY);
  return state
    ? JSON.parse(state)
    : { uid: null, displayName: null, email: null, token: null };
};

const initialState: UserState = loadStateFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state));
    },
    logout: (state) => {
      state.uid = null;
      state.displayName = null;
      state.email = null;
      state.token = null;
      localStorage.removeItem(USER_STORAGE_KEY);
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
