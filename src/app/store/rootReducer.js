import { combineReducers } from '@reduxjs/toolkit';

import adminReducer from '../../features/admin/adminSlice';
import appReducer from '../../features/app/appSlice';
import botSessionReducer from '../../features/botSession/botSessionSlice';
import categoriesReducer from '../../features/categories/categoriesSlice';
import chatsReducer from '../../features/chats/chatsSlice';
import messagesReducer from '../../features/messages/messagesSlice';
import ordersReducer from '../../features/orders/ordersSlice';
import productsReducer from '../../features/products/productsSlice';

export const rootReducer = combineReducers({
  admin: adminReducer,
  app: appReducer,
  botSession: botSessionReducer,
  categories: categoriesReducer,
  chats: chatsReducer,
  messages: messagesReducer,
  orders: ordersReducer,
  products: productsReducer,
});
