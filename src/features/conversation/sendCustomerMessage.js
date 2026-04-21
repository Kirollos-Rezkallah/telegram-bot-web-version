import { applyBotTransition, recordCustomerMessage } from '../botSession/botSessionSlice';
import { BOT_CHAT_ID } from '../botSession/botStages';
import { runCakeOrderBot } from '../botSession/botEngine';
import { markChatRead, updateChatPreview } from '../chats/chatsSlice';
import { selectActiveChat } from '../chats/chatsSelectors';
import { addMessage } from '../messages/messagesSlice';
import { updateOrder } from '../orders/ordersSlice';
import { formatChatTimestamp } from '../../utils/dateLabels';

export function sendCustomerMessage(rawText, options = {}) {
  return (dispatch, getState) => {
    const text = rawText.trim();

    if (!text) {
      return null;
    }

    const state = getState();
    const activeChat = selectActiveChat(state);

    if (!activeChat) {
      return null;
    }

    const messageAction = addMessage({
      author: 'customer',
      chatId: activeChat.id,
      status: 'sent',
      text,
    });

    dispatch(messageAction);
    dispatch(markChatRead(activeChat.id));
    dispatch(
      updateChatPreview({
        chatId: activeChat.id,
        lastMessageAt: messageAction.payload.createdAt,
        subtitle: text,
        timestamp: formatChatTimestamp(messageAction.payload.createdAt),
      }),
    );

    dispatch(
      recordCustomerMessage({
        chatId: activeChat.id,
        createdAt: messageAction.payload.createdAt,
        messageId: messageAction.payload.id,
      }),
    );

    if (activeChat.id === BOT_CHAT_ID) {
      const botResult = runCakeOrderBot({
        input: options.productId ?? text,
        quickActionId: options.quickActionId,
        state: getState(),
      });

      if (botResult.orderUpdates) {
        const orderId = getState().orders.draftOrderId;

        if (orderId) {
          dispatch(
            updateOrder({
              orderId,
              updates: botResult.orderUpdates,
            }),
          );
        }
      }

      if (botResult.botSession) {
        dispatch(applyBotTransition(botResult.botSession));
      }

      botResult.messages.forEach((botText) => {
        const botMessage = typeof botText === 'string' ? { text: botText } : botText;
        const botMessageAction = addMessage({
          author: 'assistant',
          chatId: activeChat.id,
          invoice: botMessage.invoice,
          orderIds: botMessage.orderIds,
          orderReview: botMessage.orderReview,
          productIds: botMessage.productIds,
          status: 'delivered',
          text: botMessage.text,
          type: botMessage.type,
        });

        dispatch(botMessageAction);
        dispatch(
          updateChatPreview({
            chatId: activeChat.id,
            lastMessageAt: botMessageAction.payload.createdAt,
            subtitle: botMessage.text,
            timestamp: formatChatTimestamp(botMessageAction.payload.createdAt),
          }),
        );
      });
    }

    return messageAction.payload;
  };
}
