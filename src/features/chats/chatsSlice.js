import { createSlice } from '@reduxjs/toolkit';

import { seedChatsState } from '../../services/seedData';

const chatsSlice = createSlice({
  name: 'chats',
  initialState: seedChatsState,
  reducers: {
    upsertChat(state, action) {
      const chat = action.payload;

      if (!state.entities[chat.id]) {
        state.ids.push(chat.id);
      }

      state.entities[chat.id] = {
        ...state.entities[chat.id],
        ...chat,
      };
    },
    markChatRead(state, action) {
      const chat = state.entities[action.payload];

      if (chat) {
        chat.unreadCount = 0;
      }
    },
    updateChatPreview(state, action) {
      const { chatId, lastMessageAt, subtitle, timestamp } = action.payload;
      const chat = state.entities[chatId];

      if (chat) {
        chat.subtitle = subtitle ?? chat.subtitle;
        chat.timestamp = timestamp ?? chat.timestamp;
        chat.lastMessageAt = lastMessageAt ?? chat.lastMessageAt;
      }
    },
  },
});

export const { markChatRead, updateChatPreview, upsertChat } = chatsSlice.actions;
export default chatsSlice.reducer;
