import { combineReducers } from '@reduxjs/toolkit';

import adminReducer from '../../features/admin/adminSlice';
import chatReducer from '../../features/chat/chatSlice';
import ordersReducer from '../../features/orders/ordersSlice';
import sessionReducer from '../../features/session/sessionSlice';

export const rootReducer = combineReducers({
  admin: adminReducer,
  chat: chatReducer,
  orders: ordersReducer,
  session: sessionReducer,
});
