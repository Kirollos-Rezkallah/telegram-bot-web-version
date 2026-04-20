import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  initialized: true,
  customerName: 'Anastasia Guest',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { setRole } = sessionSlice.actions;
export default sessionSlice.reducer;
