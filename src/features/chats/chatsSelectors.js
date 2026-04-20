export const selectActiveChatId = (state) => state.app.activeChatId;

export const selectChatList = (state) => {
  const query = state.app.sidebarQuery.trim().toLowerCase();
  const chats = state.chats.ids.map((id) => state.chats.entities[id]).filter(Boolean);

  const filteredChats = query
    ? chats.filter((chat) => `${chat.title} ${chat.subtitle}`.toLowerCase().includes(query))
    : chats;

  return [...filteredChats].sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1;
    }

    return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
  });
};

export const selectActiveChat = (state) => {
  const activeChat = state.chats.entities[state.app.activeChatId];

  if (activeChat) {
    return activeChat;
  }

  return state.chats.entities[state.chats.ids[0]] ?? null;
};
