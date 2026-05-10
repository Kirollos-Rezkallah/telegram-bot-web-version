import { applyBotTransition } from '../botSession/botSessionSlice';
import { BOT_CHAT_ID, BOT_STAGES, MAIN_BOT_ACTIONS } from '../botSession/botStages';
import { updateChatPreview } from '../chats/chatsSlice';
import { addMessage } from '../messages/messagesSlice';
import { createConfirmedOrder, updateOrder } from '../orders/ordersSlice';
import { PAYMENT_METHODS, PAYMENT_STATUSES, paymentMethodLabels } from './paymentModel';
import { formatChatTimestamp } from '../../utils/dateLabels';

function buildConfirmationText({ method, order, product }) {
  const item = product ? ` — ${product.name}` : '';

  if (method === PAYMENT_METHODS.PICKUP) {
    return `Заказ №${order.id.replace('order-', '').slice(0, 8).toUpperCase()} принят${item}. Оплата отмечена как ожидаемая и будет произведена при получении. Следить за заказом можно в разделе «Мои заказы».`;
  }

  return `Оплата через способ «${paymentMethodLabels[method]}» получена. Заказ №${order.id.replace('order-', '').slice(0, 8).toUpperCase()} оформлен${item}. Мы получили его в работу, стартовый статус — «Новый».`;
}

export function finalizeInvoicePayment({ invoice, method }) {
  return (dispatch, getState) => {
    const state = getState();
    const draft = state.botSession.draftOrder;
    const productId = invoice?.productId ?? draft.productId;
    const product = state.products.entities[productId];
    const quantity = invoice?.quantity ?? draft.quantity;
    const pickupDate = invoice?.pickupDate ?? draft.pickupDate;

    if (!product || !quantity || !pickupDate) {
      return null;
    }

    const isPickup = method === PAYMENT_METHODS.PICKUP;
    const now = new Date().toISOString();
    const createOrderAction = createConfirmedOrder({
      chatId: BOT_CHAT_ID,
      comment: invoice?.comment ?? draft.comment ?? '',
      invoiceIssuedAt: invoice?.invoiceIssuedAt ?? now,
      paidAt: isPickup ? undefined : now,
      paymentMethod: method,
      paymentStatus: isPickup ? PAYMENT_STATUSES.PENDING : PAYMENT_STATUSES.PAID,
      pickupDate,
      productId,
      quantity,
      total: invoice?.total ?? product.basePrice * quantity,
    });

    dispatch(createOrderAction);

    const draftOrderId = getState().orders.draftOrderId;

    if (draftOrderId) {
      dispatch(
        updateOrder({
          orderId: draftOrderId,
          updates: {
            productId: null,
            quantity: 1,
            pickupDate: '',
            deliveryDate: '',
            comment: '',
            inscription: '',
            estimatedTotal: 0,
            status: 'Draft',
          },
        }),
      );
    }

    dispatch(
      applyBotTransition({
        currentStep: BOT_STAGES.IDLE,
        availableActions: MAIN_BOT_ACTIONS,
        draftOrder: {
          productId: null,
          quantity: null,
          pickupDate: '',
          comment: '',
        },
      }),
    );

    const order = createOrderAction.payload;
    const text = buildConfirmationText({ method, order, product });
    const messageAction = addMessage({
      author: 'assistant',
      chatId: BOT_CHAT_ID,
      orderIds: [order.id],
      status: 'delivered',
      text,
      type: 'text',
    });

    dispatch(messageAction);
    dispatch(
      updateChatPreview({
        chatId: BOT_CHAT_ID,
        lastMessageAt: messageAction.payload.createdAt,
        subtitle: text,
        timestamp: formatChatTimestamp(messageAction.payload.createdAt),
      }),
    );

    return order;
  };
}
