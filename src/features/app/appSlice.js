import { createSlice } from '@reduxjs/toolkit';

import { seedAppState } from '../../services/seedData';

const appSlice = createSlice({
  name: 'app',
  initialState: seedAppState,
  reducers: {
    setActiveChat(state, action) {
      state.activeChatId = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    setSidebarQuery(state, action) {
      state.sidebarQuery = action.payload;
    },
    setMessageSearchQuery(state, action) {
      state.messageSearchQuery = action.payload;
    },
    setMessageSearchOpen(state, action) {
      state.messageSearchOpen = action.payload;

      if (!action.payload) {
        state.messageSearchQuery = '';
      }
    },
    toggleMessageSearch(state) {
      state.messageSearchOpen = !state.messageSearchOpen;

      if (!state.messageSearchOpen) {
        state.messageSearchQuery = '';
      }
    },
    setDetailPanelOpen(state, action) {
      state.detailPanelOpen = action.payload;
    },
    toggleDetailPanel(state) {
      state.detailPanelOpen = !state.detailPanelOpen;
    },
    setSidebarWidth(state, action) {
      state.layout.sidebarWidth = action.payload;
    },
    setDetailPanelWidth(state, action) {
      state.layout.detailPanelWidth = action.payload;
    },
  },
});

export const {
  setActiveChat,
  setDetailPanelOpen,
  setDetailPanelWidth,
  setMessageSearchQuery,
  setMessageSearchOpen,
  setMode,
  setRole,
  setSidebarQuery,
  setSidebarWidth,
  toggleDetailPanel,
  toggleMessageSearch,
} = appSlice.actions;
export default appSlice.reducer;
