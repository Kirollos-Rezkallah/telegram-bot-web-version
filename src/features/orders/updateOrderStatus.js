import { incrementUnread, updateChatPreview } from '../chats/chatsSlice';
import { addMessage } from '../messages/messagesSlice';
import { updateOrder } from './ordersSlice';
import { formatChatTimestamp } from '../../utils/dateLabels';

const getShortId = (id) => id.replace('order-', '').slice(0, 8).toUpperCase();

const statusCopy = {
  New: 'Your order has been received by the atelier.',
  Confirmed: 'Your order has been confirmed. We have reserved production time for it.',
  'In progress': 'Your order is now in progress. The pastry team has started preparing it.',
  Ready: 'Your order is ready for pickup. Please arrive during the selected pickup window.',
  Completed: 'Your order is completed. Thank you for choosing Anastasia Atelier.',
};

export function updateOrderStatus({ orderId, status }) {
  return (dispatch, getState) => {
    const state = getState();
    const order = state.orders.entities[orderId];

    if (!order || order.status === status) {
      return null;
    }

    dispatch(
      updateOrder({
        orderId,
        updates: {
          status,
        },
      }),
    );

    const product = state.products.entities[order.productId];
    const chatId = order.chatId;
    const text = [
      `Order #${getShortId(order.id)} status updated: ${status}.`,
      statusCopy[status] ?? 'We will keep you updated as the order moves forward.',
      product ? `Item: ${product.name}.` : null,
    ]
      .filter(Boolean)
      .join(' ');

    const messageAction = addMessage({
      author: 'assistant',
      chatId,
      orderIds: [order.id],
      status: 'delivered',
      text,
      type: 'text',
    });

    dispatch(messageAction);
    dispatch(
      updateChatPreview({
        chatId,
        lastMessageAt: messageAction.payload.createdAt,
        subtitle: text,
        timestamp: formatChatTimestamp(messageAction.payload.createdAt),
      }),
    );

    if (state.app.activeChatId !== chatId) {
      dispatch(incrementUnread(chatId));
    }

    return messageAction.payload;
  };
}
