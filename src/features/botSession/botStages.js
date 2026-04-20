export const BOT_CHAT_ID = 'cake-order-bot';

export const BOT_STAGES = {
  IDLE: 'idle',
  BROWSING_CATALOG: 'browsing_catalog',
  CHOOSING_PRODUCT: 'choosing_product',
  ENTERING_QUANTITY: 'entering_quantity',
  ENTERING_PICKUP_DATE: 'entering_pickup_date',
  ENTERING_COMMENT: 'entering_comment',
  REVIEWING_ORDER: 'reviewing_order',
  ORDER_CONFIRMED: 'order_confirmed',
  VIEWING_ORDERS: 'viewing_orders',
  HELP: 'help',
};

export const MAIN_BOT_ACTIONS = [
  {
    id: 'view_catalog',
    label: 'View catalog',
  },
  {
    id: 'make_order',
    label: 'Make order',
  },
  {
    id: 'my_orders',
    label: 'My orders',
  },
  {
    id: 'help',
    label: 'Help',
  },
];

export const ORDER_REVIEW_ACTIONS = [
  {
    id: 'confirm_order',
    label: 'Confirm order',
  },
  {
    id: 'make_order',
    label: 'Edit order',
  },
];
