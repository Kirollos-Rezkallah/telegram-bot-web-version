import { useDispatch, useSelector } from 'react-redux';

import { AppFrame } from '../../components/AppFrame/AppFrame';
import { BotQuickActions } from '../../components/BotQuickActions/BotQuickActions';
import { ChatHeader } from '../../components/ChatHeader/ChatHeader';
import { ChatList } from '../../components/ChatList/ChatList';
import { Composer } from '../../components/Composer/Composer';
import { MessageList } from '../../components/MessageList/MessageList';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import { SidebarHeader } from '../../components/SidebarHeader/SidebarHeader';
import { TelegramShell } from '../../components/TelegramShell/TelegramShell';
import { setDetailPanelOpen, toggleDetailPanel } from '../../features/app/appSlice';
import { selectActiveChat } from '../../features/chats/chatsSelectors';
import { selectMessagesForActiveChat } from '../../features/messages/messagesSelectors';
import { selectDraftOrder } from '../../features/orders/ordersSelectors';
import { selectProductById } from '../../features/products/productsSelectors';
import styles from './MessengerPage.module.css';

export function MessengerPage() {
  const dispatch = useDispatch();
  const activeChat = useSelector(selectActiveChat);
  const messages = useSelector(selectMessagesForActiveChat);
  const draftOrder = useSelector(selectDraftOrder);
  const product = useSelector((state) => selectProductById(state, draftOrder?.productId));
  const detailPanelOpen = useSelector((state) => state.app.detailPanelOpen);

  return (
    <AppFrame className={styles.page}>
      <TelegramShell
        sidebar={
          <>
            <SidebarHeader />
            <ChatList />
          </>
        }
        details={
          detailPanelOpen ? (
            <OrderSummary
              chat={activeChat}
              order={draftOrder}
              product={product}
              tone={activeChat?.tone}
              onClose={() => dispatch(setDetailPanelOpen(false))}
            />
          ) : null
        }
      >
        <ChatHeader
          title={activeChat?.title ?? 'Cake Order Bot'}
          subtitle={activeChat?.statusText ?? 'bot is online'}
          onProfileClick={() => dispatch(toggleDetailPanel())}
          tone={activeChat?.tone}
        />
        <MessageList messages={messages} />
        <BotQuickActions />
        <Composer />
      </TelegramShell>
    </AppFrame>
  );
}
