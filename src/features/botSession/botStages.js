export const BOT_CHAT_ID = 'cake-order-bot';

export const BOT_STAGES = {
  IDLE: 'idle',
  BROWSING_CATALOG: 'browsing_catalog',
  CHOOSING_PRODUCT: 'choosing_product',
  ENTERING_QUANTITY: 'entering_quantity',
  ENTERING_PICKUP_DATE: 'entering_pickup_date',
  ENTERING_COMMENT: 'entering_comment',
  REVIEWING_ORDER: 'reviewing_order',
  AWAITING_PAYMENT: 'awaiting_payment',
  ORDER_CONFIRMED: 'order_confirmed',
  VIEWING_ORDERS: 'viewing_orders',
  HELP: 'help',
};

export const MAIN_BOT_ACTIONS = [
  {
    id: 'view_catalog',
    label: 'Каталог',
  },
  {
    id: 'make_order',
    label: 'Оформить заказ',
  },
  {
    id: 'my_orders',
    label: 'Мои заказы',
  },
  {
    id: 'help',
    label: 'Помощь',
  },
];

export const ORDER_REVIEW_ACTIONS = [
  {
    id: 'confirm_order',
    label: 'Перейти к оплате',
  },
  {
    id: 'make_order',
    label: 'Изменить заказ',
  },
];
