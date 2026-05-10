import { incrementUnread, updateChatPreview } from '../chats/chatsSlice';
import { addMessage } from '../messages/messagesSlice';
import { updateOrder } from './ordersSlice';
import { formatChatTimestamp } from '../../utils/dateLabels';

const getShortId = (id) => id.replace('order-', '').slice(0, 8).toUpperCase();

const statusCopy = {
  Новый: 'Мы получили ваш заказ в ателье.',
  Подтвержден: 'Заказ подтвержден. Мы зарезервировали для него производственное время.',
  'В работе': 'Заказ уже в работе. Кондитерская команда приступила к приготовлению.',
  Готов: 'Заказ готов к получению. Пожалуйста, приходите в выбранный интервал.',
  Завершен: 'Заказ завершен. Спасибо, что выбрали Anastasia Atelier.',
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
      `Статус заказа №${getShortId(order.id)} обновлен: ${status}.`,
      statusCopy[status] ?? 'Мы будем сообщать вам о следующих изменениях по заказу.',
      product ? `Позиция: ${product.name}.` : null,
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
