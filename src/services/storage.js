import { createSeedState } from './seedData';

export const STORAGE_KEY = 'anastasia-confectionery-state';
const STORAGE_VERSION = 3;
const SUPPORTED_BOT_STEPS = new Set([
  'idle',
  'browsing_catalog',
  'choosing_product',
  'entering_quantity',
  'entering_pickup_date',
  'entering_comment',
  'reviewing_order',
  'awaiting_payment',
  'order_confirmed',
  'viewing_orders',
  'help',
]);

const isBrowser = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const seedState = createSeedState();
const orderStatusMap = {
  New: 'Новый',
  Confirmed: 'Подтвержден',
  'In progress': 'В работе',
  Ready: 'Готов',
  Completed: 'Завершен',
  Draft: 'draft',
};
const actionLabelMap = {
  view_catalog: 'Каталог',
  make_order: 'Оформить заказ',
  my_orders: 'Мои заказы',
  help: 'Помощь',
  confirm_order: 'Перейти к оплате',
};

const hasCyrillic = (value) => typeof value === 'string' && /[А-Яа-яЁё]/.test(value);
const normalizeOrderStatus = (status) => orderStatusMap[status] ?? status;

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

function localizeSeedCollections(mergedState) {
  seedState.categories.ids.forEach((id) => {
    const current = mergedState.categories.entities[id];
    const seedCategory = seedState.categories.entities[id];

    if (current && seedCategory && !hasCyrillic(current.name)) {
      mergedState.categories.entities[id] = {
        ...current,
        name: seedCategory.name,
      };
    }
  });

  seedState.products.ids.forEach((id) => {
    const current = mergedState.products.entities[id];
    const seedProduct = seedState.products.entities[id];

    if (!current || !seedProduct) {
      return;
    }

    const shouldLocalizeName = !hasCyrillic(current.name);
    const shouldLocalizeDescription = !hasCyrillic(current.description);

    if (!shouldLocalizeName && !shouldLocalizeDescription) {
      return;
    }

    mergedState.products.entities[id] = {
      ...current,
      name: shouldLocalizeName ? seedProduct.name : current.name,
      description: shouldLocalizeDescription ? seedProduct.description : current.description,
      tags: shouldLocalizeName ? seedProduct.tags : current.tags,
      sizeOptions: shouldLocalizeName ? seedProduct.sizeOptions : current.sizeOptions,
      image: current.image || seedProduct.image,
      imagePosition: current.imagePosition || seedProduct.imagePosition,
    };
  });

  seedState.chats.ids.forEach((id) => {
    const current = mergedState.chats.entities[id];
    const seedChat = seedState.chats.entities[id];

    if (!current || !seedChat) {
      return;
    }

    mergedState.chats.entities[id] = {
      ...current,
      title: hasCyrillic(current.title) ? current.title : seedChat.title,
      statusText: hasCyrillic(current.statusText) ? current.statusText : seedChat.statusText,
    };
  });

  seedState.messages.ids.forEach((id) => {
    const current = mergedState.messages.entities[id];
    const seedMessage = seedState.messages.entities[id];

    if (current && seedMessage && current.chatId === seedMessage.chatId && current.author === seedMessage.author) {
      mergedState.messages.entities[id] = {
        ...current,
        text: seedMessage.text,
      };
    }
  });
}

function mergeSavedState(savedState) {
  if (!savedState || typeof savedState !== 'object') {
    return undefined;
  }

  const mergedState = {
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
      availableActions: (savedState.botSession?.availableActions ?? seedState.botSession.availableActions).map((action) => ({
        ...action,
        label: actionLabelMap[action.id] ?? action.label,
      })),
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

  mergedState.orders.ids.forEach((id) => {
    const order = mergedState.orders.entities[id];

    if (!order) {
      return;
    }

    mergedState.orders.entities[id] = {
      ...order,
      status: normalizeOrderStatus(order.status),
    };
  });

  localizeSeedCollections(mergedState);

  return mergedState;
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

    if (saved?.version <= STORAGE_VERSION) {
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
