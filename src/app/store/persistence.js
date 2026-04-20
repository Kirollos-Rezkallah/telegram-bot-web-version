import { saveClientState } from '../../services/storage';
import { throttle } from '../../utils/throttle';

const selectPersistedState = (state) => ({
  app: state.app,
  botSession: state.botSession,
  categories: state.categories,
  chats: state.chats,
  messages: state.messages,
  orders: state.orders,
  products: state.products,
});

export function initializeClientPersistence(store) {
  const persist = throttle(() => {
    saveClientState(selectPersistedState(store.getState()));
  }, 700);

  store.subscribe(persist);
}
