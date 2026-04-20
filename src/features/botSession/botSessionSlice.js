import { createSlice } from '@reduxjs/toolkit';

import { seedBotSessionState } from '../../services/seedData';

const botSessionSlice = createSlice({
  name: 'botSession',
  initialState: seedBotSessionState,
  reducers: {
    setConversationStep(state, action) {
      state.currentStep = action.payload;
      state.lastPromptAt = new Date().toISOString();
    },
    updateCollectedDetails(state, action) {
      state.collected = {
        ...state.collected,
        ...action.payload,
      };
    },
    setSuggestedProducts(state, action) {
      state.suggestedProductIds = action.payload;
    },
    recordCustomerMessage(state, action) {
      const { chatId, createdAt, messageId } = action.payload;

      if (chatId === state.chatId) {
        state.lastCustomerMessageId = messageId;
        state.lastCustomerMessageAt = createdAt;
      }
    },
    applyBotTransition(state, action) {
      const updates = action.payload;

      Object.assign(state, updates, {
        draftOrder: {
          ...state.draftOrder,
          ...updates.draftOrder,
        },
        lastPromptAt: new Date().toISOString(),
      });
    },
  },
});

export const {
  applyBotTransition,
  recordCustomerMessage,
  setConversationStep,
  setSuggestedProducts,
  updateCollectedDetails,
} = botSessionSlice.actions;
export default botSessionSlice.reducer;
