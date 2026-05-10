import { markChatRead, updateChatPreview } from '../chats/chatsSlice';
import { selectActiveChat } from '../chats/chatsSelectors';
import { addMessage } from '../messages/messagesSlice';
import { formatChatTimestamp } from '../../utils/dateLabels';
import { formatFileSize } from '../../utils/formatters';

function getFileExtension(fileName = '') {
  const extension = fileName.split('.').pop();

  return extension && extension !== fileName ? extension.toUpperCase() : 'ФАЙЛ';
}

export function sendCustomerFile(file) {
  return (dispatch, getState) => {
    const activeChat = selectActiveChat(getState());

    if (!activeChat || !file) {
      return null;
    }

    const attachment = {
      extension: getFileExtension(file.name),
      mimeType: file.type || 'application/octet-stream',
      name: file.name || 'Загруженный файл',
      size: file.size || 0,
      sizeLabel: formatFileSize(file.size || 0),
    };

    const messageAction = addMessage({
      attachment,
      author: 'customer',
      chatId: activeChat.id,
      status: 'sent',
      text: attachment.name,
      type: 'file',
    });

    dispatch(messageAction);
    dispatch(markChatRead(activeChat.id));
    dispatch(
      updateChatPreview({
        chatId: activeChat.id,
        lastMessageAt: messageAction.payload.createdAt,
        subtitle: `Файл: ${attachment.name}`,
        timestamp: formatChatTimestamp(messageAction.payload.createdAt),
      }),
    );

    return messageAction.payload;
  };
}
