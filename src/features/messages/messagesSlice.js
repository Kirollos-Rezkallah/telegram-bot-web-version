import { createSlice } from '@reduxjs/toolkit';

import { seedMessagesState } from '../../services/seedData';
import { createId } from '../../utils/createId';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: seedMessagesState,
  reducers: {
    addMessage: {
      reducer(state, action) {
        const message = action.payload;

        state.ids.push(message.id);
        state.entities[message.id] = message;
        state.idsByChatId[message.chatId] = [...(state.idsByChatId[message.chatId] ?? []), message.id];
      },
      prepare({
        attachment,
        author = 'customer',
        chatId,
        invoice,
        orderIds,
        orderReview,
        productIds,
        status = 'sent',
        text,
        type = 'text',
      }) {
        return {
          payload: {
            id: createId('msg'),
            chatId,
            attachment,
            author,
            invoice,
            orderIds,
            orderReview,
            productIds,
            status,
            text,
            type,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    setMessageStatus(state, action) {
      const { messageId, status } = action.payload;

      if (state.entities[messageId]) {
        state.entities[messageId].status = status;
      }
    },
  },
});

export const { addMessage, setMessageStatus } = messagesSlice.actions;
export default messagesSlice.reducer;
