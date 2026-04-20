import { MessageBubble } from '../MessageBubble/MessageBubble';
import styles from './MessageList.module.css';

export function MessageList({ messages }) {
  return (
    <div className={styles.scroller}>
      <div className={styles.dayDivider}>Today</div>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
