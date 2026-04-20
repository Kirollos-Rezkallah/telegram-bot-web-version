import { useSelector } from 'react-redux';

import { AppFrame } from '../../components/AppFrame/AppFrame';
import { ChatHeader } from '../../components/ChatHeader/ChatHeader';
import { ChatList } from '../../components/ChatList/ChatList';
import { Composer } from '../../components/Composer/Composer';
import { MessageList } from '../../components/MessageList/MessageList';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import { SidebarHeader } from '../../components/SidebarHeader/SidebarHeader';
import { TelegramShell } from '../../components/TelegramShell/TelegramShell';
import styles from './MessengerPage.module.css';

export function MessengerPage() {
  const { activeDialogId, dialogs, messagesByDialogId } = useSelector((state) => state.chat);
  const draftOrder = useSelector((state) => state.orders.draftOrder);
  const activeDialog = dialogs.find((dialog) => dialog.id === activeDialogId) ?? dialogs[0];
  const messages = messagesByDialogId[activeDialog.id] ?? [];

  return (
    <AppFrame className={styles.page}>
      <TelegramShell
        sidebar={
          <>
            <SidebarHeader />
            <ChatList />
          </>
        }
        details={<OrderSummary order={draftOrder} />}
      >
        <ChatHeader title={activeDialog.title} subtitle="order assistant is online" />
        <MessageList messages={messages} />
        <Composer />
      </TelegramShell>
    </AppFrame>
  );
}
