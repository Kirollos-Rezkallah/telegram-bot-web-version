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
    name: "Signature cakes",
    slug: "signature-cakes",
    sortOrder: 10,
  },
  {
    id: "cat-mousse-cakes",
    name: "Mousse cakes",
    slug: "mousse-cakes",
    sortOrder: 20,
  },
  {
    id: "cat-macarons",
    name: "Macarons",
    slug: "macarons",
    sortOrder: 30,
  },
  {
    id: "cat-dessert-boxes",
    name: "Dessert boxes",
    slug: "dessert-boxes",
    sortOrder: 40,
  },
  {
    id: "cat-wedding",
    name: "Wedding desserts",
    slug: "wedding-desserts",
    sortOrder: 50,
  },
]);

export const seedProductsState = normalize([
  {
    id: "prod-berry-vanilla-mousse",
    categoryId: "cat-mousse-cakes",
    name: "Berry vanilla mousse cake",
    description:
      "Vanilla sponge, berry confit, mascarpone mousse, and white chocolate glaze.",
    image:
      "https://images.pexels.com/photos/28487979/pexels-photo-28487979.jpeg",
    imagePosition: "50% 58%",
    basePrice: 6800,
    sizeOptions: ["1.8 kg", "2.2 kg", "2.8 kg"],
    leadTimeHours: 48,
    isAvailable: true,
    tags: ["bestseller", "birthday"],
  },
  {
    id: "prod-pistachio-raspberry",
    categoryId: "cat-signature-cakes",
    name: "Pistachio raspberry cake",
    description:
      "Pistachio dacquoise, raspberry cremeux, and soft cream cheese frosting.",
    image:
      "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 62%",
    basePrice: 7600,
    sizeOptions: ["1.6 kg", "2.4 kg"],
    leadTimeHours: 72,
    isAvailable: true,
    tags: ["premium", "nutty"],
  },
  {
    id: "prod-honey-caramel",
    categoryId: "cat-signature-cakes",
    name: "Honey caramel layer cake",
    description:
      "Thin honey layers, salted caramel cream, and roasted almond crumb.",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 57%",
    basePrice: 5900,
    sizeOptions: ["1.5 kg", "2 kg", "3 kg"],
    leadTimeHours: 48,
    isAvailable: true,
    tags: ["classic"],
  },
  {
    id: "prod-chocolate-cherry",
    categoryId: "cat-signature-cakes",
    name: "Chocolate cherry truffle cake",
    description: "Dark chocolate biscuit, cherry compote, and whipped ganache.",
    image:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 60%",
    basePrice: 7200,
    sizeOptions: ["1.8 kg", "2.5 kg"],
    leadTimeHours: 72,
    isAvailable: true,
    tags: ["rich", "evening"],
  },
  {
    id: "prod-macaron-24",
    categoryId: "cat-macarons",
    name: "Macaron gift box, 24 pcs",
    description: "Assorted macarons with optional ribbon and handwritten card.",
    image:
      "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 52%",
    basePrice: 4200,
    sizeOptions: ["24 pcs"],
    leadTimeHours: 24,
    isAvailable: true,
    tags: ["gift"],
  },
  {
    id: "prod-mini-dessert-box",
    categoryId: "cat-dessert-boxes",
    name: "Mini dessert tasting box",
    description:
      "Six mini desserts for sampling mousse, berry, chocolate, and caramel flavors.",
    image:
      "https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 56%",
    basePrice: 3600,
    sizeOptions: ["6 pcs", "12 pcs"],
    leadTimeHours: 24,
    isAvailable: true,
    tags: ["tasting"],
  },
  {
    id: "prod-wedding-dessert-table",
    categoryId: "cat-wedding",
    name: "Wedding dessert table",
    description:
      "Curated table with mini tarts, macarons, pavlovas, and cake shooters.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 54%",
    basePrice: 24500,
    sizeOptions: ["30 guests", "50 guests", "80 guests"],
    leadTimeHours: 168,
    isAvailable: true,
    tags: ["event"],
  },
  {
    id: "prod-custom-cupcakes",
    categoryId: "cat-dessert-boxes",
    name: "Custom cupcake set",
    description:
      "Vanilla or chocolate cupcakes with colored cream and themed toppers.",
    image:
      "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=82",
    imagePosition: "50% 58%",
    basePrice: 3900,
    sizeOptions: ["12 pcs", "24 pcs"],
    leadTimeHours: 48,
    isAvailable: true,
    tags: ["party"],
  },
]);

export const seedChatsState = normalize([
  {
    id: "cake-order-bot",
    kind: "bot",
    title: "Cake Order Bot",
    subtitle: "Berry vanilla mousse is available for Saturday.",
    statusText: "bot is online",
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
    title: "Macaron Gift Boxes",
    subtitle: "We can pack 24 pieces in ivory ribbon.",
    statusText: "last seen recently",
    timestamp: "11:32",
    unreadCount: 0,
    tone: "rose",
    lastMessageAt: minutesAgo(78),
  },
  {
    id: "wedding-desserts",
    kind: "atelier",
    title: "Wedding Desserts",
    subtitle: "Tasting slots: Thu 17:00, Fri 14:30.",
    statusText: "last seen yesterday",
    timestamp: "Yesterday",
    unreadCount: 0,
    tone: "green",
    lastMessageAt: minutesAgo(1480),
  },
  {
    id: "delivery-coordinator",
    kind: "logistics",
    title: "Delivery Coordinator",
    subtitle: "Courier window confirmed for 15:00-17:00.",
    statusText: "online",
    timestamp: "Mon",
    unreadCount: 1,
    tone: "violet",
    lastMessageAt: minutesAgo(3120),
  },
  {
    id: "custom-toppers",
    kind: "decor",
    title: "Custom Toppers",
    subtitle: "Gold acrylic lettering is ready for pickup.",
    statusText: "last seen Sunday",
    timestamp: "Sun",
    unreadCount: 0,
    tone: "amber",
    isMuted: true,
    lastMessageAt: minutesAgo(4260),
  },
  {
    id: "loyalty-club",
    kind: "channel",
    title: "Atelier Loyalty",
    subtitle: "Your next tasting has a 10% client bonus.",
    statusText: "service channel",
    timestamp: "Apr 14",
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
    text: "Welcome back. I can help assemble a premium dessert order for your event.",
    createdAt: minutesAgo(18),
    status: "read",
  },
  {
    id: "msg-cake-2",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "For Saturday, the open production slots are berry vanilla mousse, pistachio raspberry, and honey cake with caramel cream.",
    createdAt: minutesAgo(17),
    status: "read",
  },
  {
    id: "msg-cake-3",
    chatId: "cake-order-bot",
    author: "customer",
    text: "I need a birthday cake for Saturday, around 12 guests.",
    createdAt: minutesAgo(15),
    status: "read",
  },
  {
    id: "msg-cake-4",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "Lovely. The berry vanilla mousse cake is available for Saturday delivery. Would you like a 1.8 kg or 2.2 kg size?",
    createdAt: minutesAgo(14),
    status: "read",
  },
  {
    id: "msg-cake-5",
    chatId: "cake-order-bot",
    author: "customer",
    text: "1.8 kg sounds right. Can we add a short message on top?",
    createdAt: minutesAgo(11),
    status: "read",
  },
  {
    id: "msg-cake-6",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "Yes. I can add a white chocolate plaque with up to 32 characters. The current estimate is 6,800 RUB including city delivery.",
    createdAt: minutesAgo(9),
    status: "read",
  },
  {
    id: "msg-cake-7",
    chatId: "cake-order-bot",
    author: "assistant",
    text: "You can use the quick actions below: View catalog, Make order, My orders, or Help.",
    createdAt: minutesAgo(8),
    status: "delivered",
  },
  {
    id: "msg-mac-1",
    chatId: "macaron-boxes",
    author: "assistant",
    text: "The ivory ribbon boxes are back in stock today.",
    createdAt: minutesAgo(92),
    status: "read",
  },
  {
    id: "msg-mac-2",
    chatId: "macaron-boxes",
    author: "customer",
    text: "Please reserve one set for Friday morning.",
    createdAt: minutesAgo(90),
    status: "read",
  },
  {
    id: "msg-wed-1",
    chatId: "wedding-desserts",
    author: "assistant",
    text: "For the tasting, we can prepare vanilla berry, pistachio raspberry, and caramel hazelnut.",
    createdAt: minutesAgo(1500),
    status: "read",
  },
  {
    id: "msg-wed-2",
    chatId: "wedding-desserts",
    author: "customer",
    text: "Friday 14:30 works best.",
    createdAt: minutesAgo(1498),
    status: "read",
  },
  {
    id: "msg-del-1",
    chatId: "delivery-coordinator",
    author: "assistant",
    text: "Courier window confirmed for 15:00-17:00. The cake box will include cooling inserts.",
    createdAt: minutesAgo(3125),
    status: "delivered",
  },
  {
    id: "msg-top-1",
    chatId: "custom-toppers",
    author: "assistant",
    text: "Gold acrylic lettering is ready for pickup and can be attached during final assembly.",
    createdAt: minutesAgo(4260),
    status: "read",
  },
  {
    id: "msg-loy-1",
    chatId: "loyalty-club",
    author: "assistant",
    text: "Your next tasting has a 10% client bonus. It will apply automatically in chat.",
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
      size: "1.8 kg",
      quantity: 1,
      deliveryDate: "Saturday",
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
      label: "View catalog",
    },
    {
      id: "make_order",
      label: "Make order",
    },
    {
      id: "my_orders",
      label: "My orders",
    },
    {
      id: "help",
      label: "Help",
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
    occasion: "birthday",
    guests: 12,
    preferredDate: "Saturday",
    selectedProductId: "prod-berry-vanilla-mousse",
    selectedSize: "1.8 kg",
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
