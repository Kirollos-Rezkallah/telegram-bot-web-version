import { BOT_STAGES, MAIN_BOT_ACTIONS, ORDER_REVIEW_ACTIONS } from './botStages';

const normalizeInput = (value) => value.trim().toLowerCase();

const getProducts = (state) => state.products.ids.map((id) => state.products.entities[id]).filter(Boolean);

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
      error: 'Укажите дату получения в формате ГГГГ-ММ-ДД или ДД.ММ.ГГГГ.',
    };
  }

  const parsedDate = new Date(year, month - 1, day);

  if (parsedDate.getFullYear() !== year || parsedDate.getMonth() !== month - 1 || parsedDate.getDate() !== day) {
    return {
      error: 'Похоже, дата указана неверно. Проверьте день и месяц.',
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsedDate.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    return {
      error: 'Дата получения не может быть в прошлом. Выберите будущую дату.',
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
    text: 'Вот актуальный каталог кондитерской. Выберите карточку десерта ниже, чтобы продолжить.',
    type: 'catalog',
    productIds: products.map((product) => product.id),
  };
}

function buildOrderReviewMessage({ draft, product }) {
  return {
    text: 'Пожалуйста, проверьте состав заказа перед оплатой.',
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

function buildInvoiceMessage({ draft, product }) {
  const total = product.basePrice * draft.quantity;

  return {
    text: `Счет для позиции «${product.name}» готов. Нажмите «Оплатить», чтобы выбрать карту, СБП или оплату при получении.`,
    type: 'invoice',
    invoice: {
      title: 'Счет Anastasia Atelier',
      description: 'Оплата кондитерского заказа',
      productId: product.id,
      quantity: draft.quantity,
      pickupDate: draft.pickupDate,
      comment: draft.comment,
      total,
      invoiceIssuedAt: new Date().toISOString(),
    },
  };
}

function buildOrderHistoryMessage(orders) {
  return {
    text: orders.length ? 'Вот ваши заказы.' : 'У вас пока нет подтвержденных заказов.',
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
        'Я могу показать каталог, помочь оформить заказ, открыть ваши заказы и подсказать по деталям получения. Используйте кнопки ниже или напишите нужный вариант.',
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
        'Отлично. Выберите позицию из карточек каталога ниже. Также можно отправить номер позиции.',
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
        messages: ['Не удалось найти такую позицию. Пожалуйста, выберите одну из карточек каталога.'],
        botSession: {
          currentStep: BOT_STAGES.CHOOSING_PRODUCT,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    return {
      messages: [`Выбрано: ${product.name}. Сколько штук вам нужно? Отправьте количество больше нуля.`],
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
        messages: ['Не хватает обязательных данных. Давайте начнем заказ заново. Пожалуйста, выберите номер позиции.'],
        botSession: {
          currentStep: BOT_STAGES.CHOOSING_PRODUCT,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    return {
      messages: [buildInvoiceMessage({ draft, product })],
      botSession: {
        currentStep: BOT_STAGES.AWAITING_PAYMENT,
        availableActions: [],
      },
    };
  }

  if (botSession.currentStep === BOT_STAGES.AWAITING_PAYMENT) {
    return {
      messages: ['Чтобы завершить заказ, используйте кнопку «Оплатить» в сообщении со счетом или нажмите «Оформить заказ», чтобы начать заново.'],
      botSession: {
        currentStep: BOT_STAGES.AWAITING_PAYMENT,
        availableActions: [],
      },
    };
  }

  if (botSession.currentStep === BOT_STAGES.CHOOSING_PRODUCT || botSession.currentStep === BOT_STAGES.BROWSING_CATALOG) {
    const product = buildProductChoice(input, products);

    if (!product) {
      return {
        messages: ['Не удалось найти такую позицию. Отправьте номер из каталога, например 1.'],
        botSession: {
          currentStep: BOT_STAGES.CHOOSING_PRODUCT,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    return {
      messages: [`Выбрано: ${product.name}. Сколько штук вам нужно? Отправьте количество больше нуля.`],
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
        messages: ['Количество должно быть целым числом больше нуля. Например: 1, 2 или 6.'],
        botSession: {
          currentStep: BOT_STAGES.ENTERING_QUANTITY,
          availableActions: MAIN_BOT_ACTIONS,
        },
      };
    }

    const product = state.products.entities[draft.productId];

    return {
      messages: [`Количество указано: ${quantity}. Теперь введите дату получения в формате ГГГГ-ММ-ДД или ДД.ММ.ГГГГ.`],
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
      messages: [`Дата получения сохранена: ${result.value}. Добавьте комментарий или надпись. Если комментария нет, отправьте "-".`],
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
        messages: ['В черновике не хватает обязательных данных. Нажмите «Оформить заказ», и мы начнем заново.'],
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
      messages: ['Нажмите «Перейти к оплате», чтобы получить счет, или «Изменить заказ», чтобы начать черновик заново.'],
      botSession: {
        currentStep: BOT_STAGES.REVIEWING_ORDER,
        availableActions: ORDER_REVIEW_ACTIONS,
      },
    };
  }

  return {
    messages: ['Я готов помочь. Выберите действие ниже: «Каталог», «Оформить заказ», «Мои заказы» или «Помощь».'],
    botSession: {
      currentStep: BOT_STAGES.IDLE,
      availableActions: MAIN_BOT_ACTIONS,
    },
  };
}
