import { BOT_CHAT_ID, BOT_STAGES, MAIN_BOT_ACTIONS, ORDER_REVIEW_ACTIONS } from './botStages';

const normalizeInput = (value) => value.trim().toLowerCase();

const getProducts = (state) => state.products.ids.map((id) => state.products.entities[id]).filter(Boolean);

const getProductLine = (product, index) => `${index + 1}. ${product.name} - ${product.basePrice} RUB`;

const getCatalogText = (products) =>
  [
    'Here is today\'s confectionery catalog:',
    ...products.map(getProductLine),
    'Send a product number to choose it, or tap Make order to start.',
  ].join('\n');

function parsePositiveInteger(input) {
  const value = Number.parseInt(input, 10);
  return Number.isInteger(value) && value > 0 ? value : null;
}

function parsePickupDate(input) {
  const normalized = input.trim();
  let year;
  let month;
  let day;

  const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const ruMatch = normalized.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (isoMatch) {
    year = Number(isoMatch[1]);
    month = Number(isoMatch[2]);
    day = Number(isoMatch[3]);
  } else if (ruMatch) {
    day = Number(ruMatch[1]);
    month = Number(ruMatch[2]);
    year = Number(ruMatch[3]);
  } else {
    return {
      error: 'Please enter the pickup date as YYYY-MM-DD or DD.MM.YYYY.',
    };
  }

  const parsedDate = new Date(year, month - 1, day);

  if (parsedDate.getFullYear() !== year || parsedDate.getMonth() !== month - 1 || parsedDate.getDate() !== day) {
    return {
      error: 'That date does not look valid. Please check the day and month.',
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsedDate.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    return {
      error: 'Pickup date cannot be in the past. Please choose a future date.',
    };
  }

  return {
    value: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  };
}

function getActionId(input, quickActionId) {
  if (quickActionId) {
    return quickActionId;
  }

  const normalized = normalizeInput(input);
  const action = [...MAIN_BOT_ACTIONS, ...ORDER_REVIEW_ACTIONS].find((item) => normalizeInput(item.label) === normalized);
  return action?.id ?? null;
}

function buildCatalogMessage(products) {
  return {
    text: 'Here is today\'s confectionery catalog. Choose a dessert card below to continue.',
    type: 'catalog',
    productIds: products.map((product) => product.id),
  };
}

function buildOrderReviewMessage({ draft, product }) {
  return {
    text: 'Please review your order summary before confirmation.',
    type: 'order_review',
    orderReview: {
      productId: product.id,
      quantity: draft.quantity,
      pickupDate: draft.pickupDate,
      comment: draft.comment,
      total: product.basePrice * draft.quantity,
    },
  };
}

function buildOrderHistoryMessage(orders) {
  return {
    text: orders.length ? 'Here are your customer orders.' : 'You do not have completed orders yet.',
    type: 'order_history',
    orderIds: orders.map((order) => order.id),
  };
}

function buildProductChoice(input, products) {
  const normalized = normalizeInput(input);
  const indexChoice = Number.parseInt(normalized, 10);

  if (Number.isInteger(indexChoice) && products[indexChoice - 1]) {
    return products[indexChoice - 1];
  }

  return products.find((product) => product.name.toLowerCase().includes(normalized)) ?? null;
}

export function runCakeOrderBot({ input, quickActionId, state }) {
  const botSession = state.botSession;
  const products = getProducts(state).filter((product) => product.isAvailable);
  const draft = botSession.draftOrder;
  const actionId = getActionId(input, quickActionId);

  if (actionId === 'view_catalog') {
    return {
      messages: [buildCatalogMessage(products)],
      botSession: {
        currentStep: BOT_STAGES.BROWSING_CATALOG,
        availableActions: MAIN_BOT_ACTIONS,
      },
    };
  }

  if (actionId === 'help') {
    return {
      messages: [
        'I can show the catalog, create a cake order, show your saved orders, and help review pickup details. Use the buttons below or type the option you need.',
      ],
      botSession: {
        currentStep: BOT_STAGES.HELP,
        availableActions: MAIN_BOT_ACTIONS,
      },
    };
  }

  if (actionId === 'my_orders') {
    const orders = state.orders.ids
      .map((id) => state.orders.entities[id])
      .filter((order) => order && order.status !== 'draft' && order.status !== 'Draft');

    return {
      messages: [buildOrderHistoryMessage(orders)],
      botSession: {
        currentStep: BOT_STAGES.VIEWING_ORDERS,
        availableActions: MAIN_BOT_ACTIONS,
      },
    };
  }

  if (actionId === 'make_order') {
    return {
      messages: [
        'Great. Please choose a product from the catalog cards below. You can also send a product number.',
        buildCatalogMessage(products),
      ],
      botSession: {
        currentStep: BOT_STAGES.CHOOSING_PRODUCT,
        availableActions: MAIN_BOT_ACTIONS,
        draftOrder: {
          productId: null,
          quantity: null,
          pickupDate: '',
          comment: '',
        },
      },
    };
  }

  if (actionId === 'select_product') {
    const product = state.products.entities[input] ?? buildProductChoice(input, products);

    if (!product) {
      return {
        messages: ['I could not find that product. Please choose one of the catalog cards.'],
        botSession: {
          currentStep: BOT_STAGES.CHOOSING_PRODUCT,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    return {
      messages: [`Selected: ${product.name}. How many would you like? Please send a quantity greater than 0.`],
      botSession: {
        currentStep: BOT_STAGES.ENTERING_QUANTITY,
        availableActions: MAIN_BOT_ACTIONS,
        draftOrder: {
          ...draft,
          productId: product.id,
          quantity: null,
        },
      },
      orderUpdates: {
        productId: product.id,
        quantity: 1,
        estimatedTotal: product.basePrice,
        status: 'draft',
      },
    };
  }

  if (actionId === 'confirm_order') {
    const product = state.products.entities[draft.productId];

    if (!product || !draft.quantity || !draft.pickupDate) {
      return {
        messages: ['Some required details are missing. Let us start the order again. Please choose a product number.'],
        botSession: {
          currentStep: BOT_STAGES.CHOOSING_PRODUCT,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    return {
      messages: ['Order created successfully. The atelier received it and it starts in status New. You can check it anytime in My orders.'],
      botSession: {
        currentStep: BOT_STAGES.IDLE,
        availableActions: MAIN_BOT_ACTIONS,
        draftOrder: {
          productId: null,
          quantity: null,
          pickupDate: '',
          comment: '',
        },
      },
      createOrder: {
        chatId: BOT_CHAT_ID,
        productId: draft.productId,
        quantity: draft.quantity,
        pickupDate: draft.pickupDate,
        comment: draft.comment,
        total: product.basePrice * draft.quantity,
      },
    };
  }

  if (botSession.currentStep === BOT_STAGES.CHOOSING_PRODUCT || botSession.currentStep === BOT_STAGES.BROWSING_CATALOG) {
    const product = buildProductChoice(input, products);

    if (!product) {
      return {
        messages: ['I could not find that product. Please send a catalog number, for example 1.'],
        botSession: {
          currentStep: BOT_STAGES.CHOOSING_PRODUCT,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    return {
      messages: [`Selected: ${product.name}. How many would you like? Please send a quantity greater than 0.`],
      botSession: {
        currentStep: BOT_STAGES.ENTERING_QUANTITY,
        availableActions: MAIN_BOT_ACTIONS,
        draftOrder: {
          ...draft,
          productId: product.id,
          quantity: null,
        },
      },
      orderUpdates: {
        productId: product.id,
        quantity: 1,
        estimatedTotal: product.basePrice,
        status: 'draft',
      },
    };
  }

  if (botSession.currentStep === BOT_STAGES.ENTERING_QUANTITY) {
    const quantity = parsePositiveInteger(input);

    if (!quantity) {
      return {
        messages: ['Quantity must be a whole number greater than 0. Please send a quantity like 1, 2, or 6.'],
        botSession: {
          currentStep: BOT_STAGES.ENTERING_QUANTITY,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    const product = state.products.entities[draft.productId];

    return {
      messages: [`Quantity set to ${quantity}. Please enter pickup date as YYYY-MM-DD or DD.MM.YYYY.`],
      botSession: {
        currentStep: BOT_STAGES.ENTERING_PICKUP_DATE,
        availableActions: MAIN_BOT_ACTIONS,
        draftOrder: {
          ...draft,
          quantity,
        },
      },
      orderUpdates: {
        quantity,
        estimatedTotal: product ? product.basePrice * quantity : 0,
      },
    };
  }

  if (botSession.currentStep === BOT_STAGES.ENTERING_PICKUP_DATE) {
    const result = parsePickupDate(input);

    if (result.error) {
      return {
        messages: [result.error],
        botSession: {
          currentStep: BOT_STAGES.ENTERING_PICKUP_DATE,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    return {
      messages: ['Pickup date saved: ' + result.value + '. Add a comment or inscription. Send "-" if there is no comment.'],
      botSession: {
        currentStep: BOT_STAGES.ENTERING_COMMENT,
        availableActions: MAIN_BOT_ACTIONS,
        draftOrder: {
          ...draft,
          pickupDate: result.value,
        },
      },
      orderUpdates: {
        pickupDate: result.value,
        deliveryDate: result.value,
      },
    };
  }

  if (botSession.currentStep === BOT_STAGES.ENTERING_COMMENT) {
    const comment = input.trim() === '-' ? '' : input.trim();
    const product = state.products.entities[draft.productId];
    const reviewDraft = {
      ...draft,
      comment,
    };

    if (!product || !reviewDraft.quantity || !reviewDraft.pickupDate) {
      return {
        messages: ['The draft is missing required details. Tap Make order and we will start again.'],
        botSession: {
          currentStep: BOT_STAGES.IDLE,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    return {
      messages: [buildOrderReviewMessage({ draft: reviewDraft, product })],
      botSession: {
        currentStep: BOT_STAGES.REVIEWING_ORDER,
        availableActions: ORDER_REVIEW_ACTIONS,
        draftOrder: reviewDraft,
      },
      orderUpdates: {
        comment,
        inscription: comment,
      },
    };
  }

  if (botSession.currentStep === BOT_STAGES.REVIEWING_ORDER) {
    return {
      messages: ['Please tap Confirm order to place it, or Edit order to restart the draft.'],
      botSession: {
        currentStep: BOT_STAGES.REVIEWING_ORDER,
        availableActions: ORDER_REVIEW_ACTIONS,
      },
    };
  }

  return {
    messages: ['I am ready to help. Choose an action below: View catalog, Make order, My orders, or Help.'],
    botSession: {
      currentStep: BOT_STAGES.IDLE,
      availableActions: MAIN_BOT_ACTIONS,
    },
  };
}
