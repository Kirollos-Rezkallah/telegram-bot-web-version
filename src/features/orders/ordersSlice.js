import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  draftOrder: {
    productName: 'Berry vanilla mousse cake',
    size: '1.8 kg',
    deliveryDate: 'Saturday',
    estimatedTotal: 6800,
  },
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateDraftOrder(state, action) {
      state.draftOrder = {
        ...state.draftOrder,
        ...action.payload,
      };
    },
  },
});

export const { updateDraftOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
