import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSection: 'overview',
  stats: {
    newOrders: 8,
    activeChats: 14,
    revenueToday: 42600,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSelectedSection(state, action) {
      state.selectedSection = action.payload;
    },
  },
});

export const { setSelectedSection } = adminSlice.actions;
export default adminSlice.reducer;
