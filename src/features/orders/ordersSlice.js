import { createSlice } from '@reduxjs/toolkit';

import { seedOrdersState } from '../../services/seedData';
import { createId } from '../../utils/createId';
import { ORDER_STATUSES } from './orderStatus';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: seedOrdersState,
  reducers: {
    createDraftOrder: {
      reducer(state, action) {
        const order = action.payload;

        state.ids.push(order.id);
        state.entities[order.id] = order;
        state.draftOrderId = order.id;
      },
      prepare({ chatId, productId }) {
        return {
          payload: {
            id: createId('order'),
            chatId,
            productId,
            status: 'draft',
            quantity: 1,
            size: '',
            deliveryDate: '',
            deliveryWindow: '',
            inscription: '',
            estimatedTotal: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        };
      },
    },
    updateOrder(state, action) {
      const { orderId, updates } = action.payload;
      const order = state.entities[orderId];

      if (order) {
        state.entities[orderId] = {
          ...order,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    setDraftOrder(state, action) {
      if (state.entities[action.payload]) {
        state.draftOrderId = action.payload;
      }
    },
    createConfirmedOrder: {
      reducer(state, action) {
        const order = action.payload;

        state.ids.push(order.id);
        state.entities[order.id] = order;
      },
      prepare({ chatId, comment = '', pickupDate, productId, quantity, total }) {
        const now = new Date().toISOString();

        return {
          payload: {
            id: createId('order'),
            chatId,
            productId,
            status: ORDER_STATUSES.NEW,
            quantity,
            pickupDate,
            deliveryDate: pickupDate,
            comment,
            inscription: comment,
            estimatedTotal: total,
            createdAt: now,
            updatedAt: now,
          },
        };
      },
    },
  },
});

export const { createConfirmedOrder, createDraftOrder, setDraftOrder, updateOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
