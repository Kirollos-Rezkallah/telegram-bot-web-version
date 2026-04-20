export const selectDraftOrder = (state) => state.orders.entities[state.orders.draftOrderId] ?? null;

export const selectOrdersList = (state) => state.orders.ids.map((id) => state.orders.entities[id]).filter(Boolean);

export const selectCustomerOrders = (state) =>
  selectOrdersList(state).filter((order) => order.status !== 'draft' && order.status !== 'Draft');
