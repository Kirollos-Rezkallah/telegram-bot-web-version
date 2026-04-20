import { formatShortTime } from '../../utils/formatters';
import styles from './MessageBubble.module.css';

export function MessageBubble({ message }) {
  const isOutgoing = message.author === 'customer';

  return (
    <article className={`${styles.bubble} ${isOutgoing ? styles.outgoing : styles.incoming}`}>
      <p>{message.text}</p>
      <time>{formatShortTime(message.createdAt)}</time>
    </article>
  );
}
