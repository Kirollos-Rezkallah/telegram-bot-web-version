import { createSeedState } from './seedData';

export const STORAGE_KEY = 'anastasia-confectionery-state';
const STORAGE_VERSION = 2;
const SUPPORTED_BOT_STEPS = new Set([
  'idle',
  'browsing_catalog',
  'choosing_product',
  'entering_quantity',
  'entering_pickup_date',
  'entering_comment',
  'reviewing_order',
  'order_confirmed',
  'viewing_orders',
  'help',
]);

const isBrowser = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const seedState = createSeedState();

function mergeCollection(seedCollection, savedCollection) {
  if (!savedCollection?.entities || !Array.isArray(savedCollection.ids)) {
    return seedCollection;
  }

  const ids = [...new Set([...seedCollection.ids, ...savedCollection.ids])];

  return {
    ...seedCollection,
    ...savedCollection,
    ids,
    entities: {
      ...seedCollection.entities,
      ...savedCollection.entities,
    },
  };
}

function mergeProductsCollection(seedCollection, savedCollection) {
  const merged = mergeCollection(seedCollection, savedCollection);

  seedCollection.ids.forEach((id) => {
    const savedProduct = savedCollection?.entities?.[id];
    const seedProduct = seedCollection.entities[id];

    if (!savedProduct || !seedProduct) {
      return;
    }

    const wasSeedImage =
      typeof savedProduct.imageUrl === 'string' &&
      savedProduct.imageUrl.includes('images.unsplash.com') &&
      savedProduct.imageUrl.includes('w=640&q=80');

    if (wasSeedImage || !savedProduct.image) {
      merged.entities[id] = {
        ...merged.entities[id],
        image: seedProduct.image,
      };
    }
  });

  merged.ids.forEach((id) => {
    const product = merged.entities[id];

    if (product && !product.image && product.imageUrl) {
      product.image = product.imageUrl;
    }
  });

  return merged;
}

function mergeSavedState(savedState) {
  if (!savedState || typeof savedState !== 'object') {
    return undefined;
  }

  return {
    app: {
      ...seedState.app,
      ...savedState.app,
      layout: {
        ...seedState.app.layout,
        ...savedState.app?.layout,
      },
      activeChatId: savedState.app?.activeChatId ?? seedState.app.activeChatId,
    },
    botSession: {
      ...seedState.botSession,
      ...savedState.botSession,
      currentStep: SUPPORTED_BOT_STEPS.has(savedState.botSession?.currentStep)
        ? savedState.botSession.currentStep
        : seedState.botSession.currentStep,
      draftOrder: {
        ...seedState.botSession.draftOrder,
        ...savedState.botSession?.draftOrder,
      },
      collected: {
        ...seedState.botSession.collected,
        ...savedState.botSession?.collected,
      },
    },
    categories: mergeCollection(seedState.categories, savedState.categories),
    chats: mergeCollection(seedState.chats, savedState.chats),
    messages: {
      ...mergeCollection(seedState.messages, savedState.messages),
      idsByChatId: {
        ...seedState.messages.idsByChatId,
        ...savedState.messages?.idsByChatId,
      },
    },
    orders: mergeCollection(seedState.orders, savedState.orders),
    products: mergeProductsCollection(seedState.products, savedState.products),
  };
}

export function loadClientState() {
  if (!isBrowser()) {
    return undefined;
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) {
      return undefined;
    }

    const saved = JSON.parse(value);

    if (saved?.version === STORAGE_VERSION) {
      return mergeSavedState(saved.state);
    }

    return undefined;
  } catch {
    return undefined;
  }
}

export function saveClientState(state) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION,
        state,
      }),
    );
  } catch {
    // Storage can be unavailable in private sessions. The app should still run.
  }
}
