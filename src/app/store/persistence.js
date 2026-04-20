import { saveClientState } from '../../services/storage';
import { throttle } from '../../utils/throttle';

const selectPersistedState = (state) => ({
  orders: state.orders,
  session: state.session,
});

export function initializeClientPersistence(store) {
  const persist = throttle(() => {
    saveClientState(selectPersistedState(store.getState()));
  }, 700);

  store.subscribe(persist);
}
