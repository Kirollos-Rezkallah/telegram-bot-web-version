import { selectActiveChat } from '../chats/chatsSelectors';

export const selectMessagesForChat = (state, chatId) => {
  const messageIds = state.messages.idsByChatId[chatId] ?? [];
  return messageIds.map((id) => state.messages.entities[id]).filter(Boolean);
};

export const selectMessagesForActiveChat = (state) => {
  const activeChat = selectActiveChat(state);
  return activeChat ? selectMessagesForChat(state, activeChat.id) : [];
};
