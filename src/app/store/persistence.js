import { loadClientState, saveClientState, STORAGE_KEY } from '../../services/storage';
import { throttle } from '../../utils/throttle';
import { hydrateClientState } from './rootReducer';

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
  let isHydratingExternalState = false;

  const persist = throttle(() => {
    if (isHydratingExternalState) {
      return;
    }

    saveClientState(selectPersistedState(store.getState()));
  }, 700);

  store.subscribe(persist);

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) {
        return;
      }

      const nextState = loadClientState();

      if (!nextState) {
        return;
      }

      isHydratingExternalState = true;
      store.dispatch(hydrateClientState(nextState));
      window.setTimeout(() => {
        isHydratingExternalState = false;
      }, 0);
    });
  }
}
