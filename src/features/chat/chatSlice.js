import { createSlice } from '@reduxjs/toolkit';

const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60 * 1000).toISOString();

const initialState = {
  activeDialogId: 'cake-order-bot',
  dialogs: [
    {
      id: 'cake-order-bot',
      title: 'Cake Order Bot',
      subtitle: 'Berry vanilla mousse is available for Saturday.',
      timestamp: '12:48',
      unreadCount: 2,
      status: 'bot',
      tone: 'blue',
      isPinned: true,
      isVerified: true,
      lastMessageAt: minutesAgo(3),
    },
    {
      id: 'macaron-boxes',
      title: 'Macaron Gift Boxes',
      subtitle: 'We can pack 24 pieces in ivory ribbon.',
      timestamp: '11:32',
      unreadCount: 0,
      status: 'supplier',
      tone: 'rose',
      lastMessageAt: minutesAgo(78),
    },
    {
      id: 'wedding-desserts',
      title: 'Wedding Desserts',
      subtitle: 'Tasting slots: Thu 17:00, Fri 14:30.',
      timestamp: 'Yesterday',
      unreadCount: 0,
      status: 'atelier',
      tone: 'green',
      lastMessageAt: minutesAgo(1480),
    },
    {
      id: 'delivery-coordinator',
      title: 'Delivery Coordinator',
      subtitle: 'Courier window confirmed for 15:00-17:00.',
      timestamp: 'Mon',
      unreadCount: 1,
      status: 'logistics',
      tone: 'violet',
      lastMessageAt: minutesAgo(3120),
    },
    {
      id: 'custom-toppers',
      title: 'Custom Toppers',
      subtitle: 'Gold acrylic lettering is ready for pickup.',
      timestamp: 'Sun',
      unreadCount: 0,
      status: 'decor',
      tone: 'amber',
      isMuted: true,
      lastMessageAt: minutesAgo(4260),
    },
    {
      id: 'loyalty-club',
      title: 'Atelier Loyalty',
      subtitle: 'Your next tasting has a 10% client bonus.',
      timestamp: 'Apr 14',
      unreadCount: 0,
      status: 'channel',
      tone: 'blue',
      lastMessageAt: minutesAgo(8600),
    },
  ],
  messagesByDialogId: {
    'cake-order-bot': [
      {
        id: 'm1',
        author: 'assistant',
        text: 'Welcome back. I can help assemble a premium dessert order for your event.',
        createdAt: minutesAgo(18),
      },
      {
        id: 'm2',
        author: 'assistant',
        text: 'For Saturday, the open production slots are berry vanilla mousse, pistachio raspberry, and honey cake with caramel cream.',
        createdAt: minutesAgo(17),
      },
      {
        id: 'm3',
        author: 'customer',
        text: 'I need a birthday cake for Saturday, around 12 guests.',
        createdAt: minutesAgo(15),
      },
      {
        id: 'm4',
        author: 'assistant',
        text: 'Lovely. The berry vanilla mousse cake is available for Saturday delivery. Would you like a 1.8 kg or 2.2 kg size?',
        createdAt: minutesAgo(14),
      },
      {
        id: 'm5',
        author: 'customer',
        text: '1.8 kg sounds right. Can we add a short message on top?',
        createdAt: minutesAgo(11),
      },
      {
        id: 'm6',
        author: 'assistant',
        text: 'Yes. I can add a white chocolate plaque with up to 32 characters. The current estimate is 6,800 ₽ including city delivery.',
        createdAt: minutesAgo(9),
      },
      {
        id: 'm7',
        author: 'assistant',
        text: 'Send the exact inscription when ready, and I will keep the draft order open here.',
        createdAt: minutesAgo(8),
      },
    ],
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveDialog(state, action) {
      state.activeDialogId = action.payload;
    },
  },
});

export const { setActiveDialog } = chatSlice.actions;
export default chatSlice.reducer;
