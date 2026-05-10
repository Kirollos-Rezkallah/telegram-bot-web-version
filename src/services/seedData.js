const minutesAgo = (minutes) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

const normalize = (items) => ({
  ids: items.map((item) => item.id),
  entities: Object.fromEntries(items.map((item) => [item.id, item])),
});

export const seedAppState = {
  initialized: true,
  role: "customer",
  mode: "customer",
  activeChatId: "cake-order-bot",
  sidebarQuery: "",
  messageSearchQuery: "",
  messageSearchOpen: false,
  detailPanelOpen: true,
  layout: {
    sidebarWidth: 386,
    detailPanelWidth: 320,
  },
};

export const seedCategoriesState = normalize([
  {
    id: "cat-signature-cakes",
    name: "Фирменные торты",
    slug: "signature-cakes",
    sortOrder: 10,
  },
  {
    id: "cat-mousse-cakes",
    name: "Муссовые торты",
    slug: "mousse-cakes",
    sortOrder: 20,
  },
  {
    id: "cat-macarons",
    name: "Макароны",
    slug: "macarons",
    sortOrder: 30,
  },
  {
    id: "cat-dessert-boxes",
    name: "Десертные наборы",
    slug: "dessert-boxes",
    sortOrder: 40,
  },
  {
    id: "cat-wedding",
    name: "Свадебные десерты",
    slug: "wedding-desserts",
    sortOrder: 50,
  },
]);

export const seedProductsState = normalize([
  {
    id: "prod-berry-vanilla-mousse",
    categoryId: "cat-mousse-cakes",
    name: "Муссовый торт с ягодами и ванилью",
    description:
      "Ванильный бисквит, ягодное конфи, мусс на маскарпоне и глазурь из белого шоколада.",
    image:
      "https://images.pexels.com/photos/28487979/pexels-photo-28487979.jpeg",
    imagePosition: "50% 58%",
    basePrice: 6800,
    sizeOptions: ["1.8 кг", "2.2 кг", "2.8 кг"],
    leadTimeHours: 48,
    isAvailable: true,
    tags: ["хит", "день рождения"],
  },
  {
    id: "prod-pistachio-raspberry",
    categoryId: "cat-signature-cakes",
    name: "Торт фисташка-малина",
    description:
      "Фисташковый дакуаз, малиновый кремё и нежный крем-чиз.",
    image:
      "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 62%",
    basePrice: 7600,
    sizeOptions: ["1.6 кг", "2.4 кг"],
    leadTimeHours: 72,
    isAvailable: true,
    tags: ["премиум", "ореховый"],
  },
  {
    id: "prod-honey-caramel",
    categoryId: "cat-signature-cakes",
    name: "Медовый торт с карамелью",
    description:
      "Тонкие медовые коржи, крем с соленой карамелью и крошка из обжаренного миндаля.",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 57%",
    basePrice: 5900,
    sizeOptions: ["1.5 кг", "2 кг", "3 кг"],
    leadTimeHours: 48,
    isAvailable: true,
    tags: ["классика"],
  },
  {
    id: "prod-chocolate-cherry",
    categoryId: "cat-signature-cakes",
    name: "Трюфельный торт с шоколадом и вишней",
    description: "Шоколадный бисквит, вишневое компоте и взбитый ганаш.",
    image:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 60%",
    basePrice: 7200,
    sizeOptions: ["1.8 кг", "2.5 кг"],
    leadTimeHours: 72,
    isAvailable: true,
    tags: ["насыщенный", "вечерний"],
  },
  {
    id: "prod-macaron-24",
    categoryId: "cat-macarons",
    name: "Подарочный набор макарон, 24 шт.",
    description: "Ассорти макарон с возможностью добавить ленту и рукописную открытку.",
    image:
      "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 52%",
    basePrice: 4200,
    sizeOptions: ["24 шт."],
    leadTimeHours: 24,
    isAvailable: true,
    tags: ["подарок"],
  },
  {
    id: "prod-mini-dessert-box",
    categoryId: "cat-dessert-boxes",
    name: "Дегустационный набор мини-десертов",
    description:
      "Шесть мини-десертов для знакомства с муссовыми, ягодными, шоколадными и карамельными вкусами.",
    image:
      "https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 56%",
    basePrice: 3600,
    sizeOptions: ["6 шт.", "12 шт."],
    leadTimeHours: 24,
    isAvailable: true,
    tags: ["дегустация"],
  },
  {
    id: "prod-wedding-dessert-table",
    categoryId: "cat-wedding",
    name: "Свадебный десертный стол",
    description:
      "Подборка мини-тартов, макарон, павловых и десертов в стаканчиках для свадебного стола.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 54%",
    basePrice: 24500,
    sizeOptions: ["30 гостей", "50 гостей", "80 гостей"],
    leadTimeHours: 168,
    isAvailable: true,
    tags: ["событие"],
  },
  {
    id: "prod-custom-cupcakes",
    categoryId: "cat-dessert-boxes",
    name: "Набор капкейков на заказ",
    description:
      "Ванильные или шоколадные капкейки с цветным кремом и тематическим декором.",
    image:
      "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 58%",
    basePrice: 3900,
    sizeOptions: ["12 шт.", "24 шт."],
    leadTimeHours: 48,
    isAvailable: true,
    tags: ["праздник"],
  },
]);

export const seedChatsState = normalize([
  {
    id: "cake-order-bot",
    kind: "bot",
    title: "Бот заказов тортов",
    subtitle: "Муссовый торт с ягодами и ванилью доступен на субботу.",
    statusText: "бот онлайн",
    timestamp: "12:48",
    unreadCount: 2,
    tone: "blue",
    isPinned: true,
    isVerified: true,
    orderId: "order-draft-birthday",
    lastMessageAt: minutesAgo(3),
  },
  {
    id: "macaron-boxes",
    kind: "supplier",
    title: "Подарочные наборы макарон",
    subtitle: "Можем упаковать 24 штуки с айвори-лентой.",
    statusText: "был(а) недавно",
    timestamp: "11:32",
    unreadCount: 0,
    tone: "rose",
    lastMessageAt: minutesAgo(78),
  },
  {
    id: "wedding-desserts",
    kind: "atelier",
    title: "Свадебные десерты",
    subtitle: "Дегустация: чт 17:00, пт 14:30.",
    statusText: "был(а) вчера",
    timestamp: "Вчера",
    unreadCount: 0,
    tone: "green",
    lastMessageAt: minutesAgo(1480),
  },
  {
    id: "delivery-coordinator",
    kind: "logistics",
    title: "Координатор доставки",
    subtitle: "Окно курьера подтверждено на 15:00-17:00.",
    statusText: "онлайн",
    timestamp: "Пн",
    unreadCount: 1,
    tone: "violet",
    lastMessageAt: minutesAgo(3120),
  },
  {
    id: "custom-toppers",
    kind: "decor",
    title: "Топперы на заказ",
    subtitle: "Золотая акриловая надпись готова к выдаче.",
    statusText: "был(а) в воскресенье",
    timestamp: "Вс",
    unreadCount: 0,
    tone: "amber",
    isMuted: true,
    lastMessageAt: minutesAgo(4260),
  },
  {
    id: "loyalty-club",
    kind: "channel",
    title: "Лояльность Atelier",
    subtitle: "На следующую дегустацию действует бонус 10%.",
    statusText: "сервисный канал",
    timestamp: "14 апр.",
    unreadCount: 0,
    tone: "blue",
    lastMessageAt: minutesAgo(8600),
  },
]);

const seedMessages = [
  {
    id: "msg-cake-1",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "С возвращением. Я помогу собрать продуманный заказ десертов для вашего события.",
    createdAt: minutesAgo(18),
    status: "read",
  },
  {
    id: "msg-cake-2",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "На субботу сейчас доступны муссовый торт с ягодами и ванилью, торт фисташка-малина и медовый торт с карамельным кремом.",
    createdAt: minutesAgo(17),
    status: "read",
  },
  {
    id: "msg-cake-3",
    chatId: "cake-order-bot",
    author: "customer",
    text: "Мне нужен торт на день рождения к субботе, примерно на 12 гостей.",
    createdAt: minutesAgo(15),
    status: "read",
  },
  {
    id: "msg-cake-4",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "Отлично. Муссовый торт с ягодами и ванилью доступен на субботу. Вам подойдет размер 1.8 кг или 2.2 кг?",
    createdAt: minutesAgo(14),
    status: "read",
  },
  {
    id: "msg-cake-5",
    chatId: "cake-order-bot",
    author: "customer",
    text: "1.8 кг подойдет. Можно добавить короткую надпись сверху?",
    createdAt: minutesAgo(11),
    status: "read",
  },
  {
    id: "msg-cake-6",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "Да. Я могу добавить табличку из белого шоколада длиной до 32 символов. Текущая оценка — 6 800 ₽, включая доставку по городу.",
    createdAt: minutesAgo(9),
    status: "read",
  },
  {
    id: "msg-cake-7",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "Вы можете воспользоваться быстрыми действиями ниже: «Каталог», «Оформить заказ», «Мои заказы» или «Помощь».",
    createdAt: minutesAgo(8),
    status: "delivered",
  },
  {
    id: "msg-mac-1",
    chatId: "macaron-boxes",
    author: "assistant",
    text: "Коробки с айвори-лентой снова в наличии сегодня.",
    createdAt: minutesAgo(92),
    status: "read",
  },
  {
    id: "msg-mac-2",
    chatId: "macaron-boxes",
    author: "customer",
    text: "Пожалуйста, отложите один набор на утро пятницы.",
    createdAt: minutesAgo(90),
    status: "read",
  },
  {
    id: "msg-wed-1",
    chatId: "wedding-desserts",
    author: "assistant",
    text: "Для дегустации можем подготовить ваниль-ягоды, фисташка-малина и карамель-фундук.",
    createdAt: minutesAgo(1500),
    status: "read",
  },
  {
    id: "msg-wed-2",
    chatId: "wedding-desserts",
    author: "customer",
    text: "Пятница 14:30 подходит лучше всего.",
    createdAt: minutesAgo(1498),
    status: "read",
  },
  {
    id: "msg-del-1",
    chatId: "delivery-coordinator",
    author: "assistant",
    text: "Окно курьера подтверждено на 15:00-17:00. В коробке для торта будут охлаждающие вставки.",
    createdAt: minutesAgo(3125),
    status: "delivered",
  },
  {
    id: "msg-top-1",
    chatId: "custom-toppers",
    author: "assistant",
    text: "Золотая акриловая надпись готова к выдаче и может быть установлена на финальной сборке.",
    createdAt: minutesAgo(4260),
    status: "read",
  },
  {
    id: "msg-loy-1",
    chatId: "loyalty-club",
    author: "assistant",
    text: "На вашу следующую дегустацию действует бонус 10%. Он применится автоматически прямо в чате.",
    createdAt: minutesAgo(8600),
    status: "read",
  },
];

export const seedMessagesState = {
  ids: seedMessages.map((message) => message.id),
  entities: Object.fromEntries(
    seedMessages.map((message) => [message.id, message]),
  ),
  idsByChatId: seedMessages.reduce((acc, message) => {
    acc[message.chatId] = [...(acc[message.chatId] ?? []), message.id];
    return acc;
  }, {}),
};

export const seedOrdersState = {
  draftOrderId: "order-draft-birthday",
  ids: ["order-draft-birthday"],
  entities: {
    "order-draft-birthday": {
      id: "order-draft-birthday",
      chatId: "cake-order-bot",
      productId: "prod-berry-vanilla-mousse",
      status: "draft",
      size: "1.8 кг",
      quantity: 1,
      deliveryDate: "Суббота",
      deliveryWindow: "15:00-17:00",
      inscription: "",
      estimatedTotal: 6800,
      createdAt: minutesAgo(16),
      updatedAt: minutesAgo(8),
    },
  },
};

export const seedBotSessionState = {
  chatId: "cake-order-bot",
  currentStep: "idle",
  availableActions: [
    {
      id: "view_catalog",
      label: "Каталог",
    },
    {
      id: "make_order",
      label: "Оформить заказ",
    },
    {
      id: "my_orders",
      label: "Мои заказы",
    },
    {
      id: "help",
      label: "Помощь",
    },
  ],
  suggestedProductIds: [
    "prod-berry-vanilla-mousse",
    "prod-pistachio-raspberry",
    "prod-honey-caramel",
  ],
  draftOrder: {
    productId: null,
    quantity: null,
    pickupDate: "",
    comment: "",
  },
  collected: {
    occasion: "день рождения",
    guests: 12,
    preferredDate: "Суббота",
    selectedProductId: "prod-berry-vanilla-mousse",
    selectedSize: "1.8 кг",
  },
  lastPromptAt: minutesAgo(8),
};

export const createSeedState = () => ({
  app: seedAppState,
  botSession: seedBotSessionState,
  categories: seedCategoriesState,
  chats: seedChatsState,
  messages: seedMessagesState,
  orders: seedOrdersState,
  products: seedProductsState,
});
