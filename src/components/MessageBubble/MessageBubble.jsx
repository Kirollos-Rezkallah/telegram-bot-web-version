import { FiCheck, FiFileText } from 'react-icons/fi';

import { CatalogMessage } from '../CatalogMessage/CatalogMessage';
import { InvoiceMessage } from '../InvoiceMessage/InvoiceMessage';
import { OrderHistoryMessage } from '../OrderHistoryMessage/OrderHistoryMessage';
import { OrderReviewMessage } from '../OrderReviewMessage/OrderReviewMessage';
import { formatShortTime } from '../../utils/formatters';
import styles from './MessageBubble.module.css';

const deliveryStatusLabels = {
  sent: 'отправлено',
  delivered: 'доставлено',
  read: 'прочитано',
};

function HighlightedText({ query, text }) {
  if (!query) {
    return text;
  }

  const index = text.toLowerCase().indexOf(query.toLowerCase());

  if (index === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export function MessageBubble({ groupedWithNext = false, groupedWithPrevious = false, message, searchQuery = '' }) {
  const isOutgoing = message.author === 'customer';
  const className = [
    styles.bubble,
    isOutgoing ? styles.outgoing : styles.incoming,
    ['catalog', 'invoice', 'order_history', 'order_review'].includes(message.type) ? styles.richBubble : '',
    groupedWithPrevious ? styles.groupedPrevious : '',
    groupedWithNext ? styles.groupedNext : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={className}>
      {message.type === 'catalog' ? (
        <>
          <p>
            <HighlightedText query={searchQuery} text={message.text} />
          </p>
          <CatalogMessage productIds={message.productIds} />
        </>
      ) : message.type === 'order_review' ? (
        <>
          <p>
            <HighlightedText query={searchQuery} text={message.text} />
          </p>
          <OrderReviewMessage review={message.orderReview} />
        </>
      ) : message.type === 'invoice' ? (
        <>
          <p>
            <HighlightedText query={searchQuery} text={message.text} />
          </p>
          <InvoiceMessage invoice={message.invoice} />
        </>
      ) : message.type === 'order_history' ? (
        <>
          <p>
            <HighlightedText query={searchQuery} text={message.text} />
          </p>
          <OrderHistoryMessage orderIds={message.orderIds} />
        </>
      ) : message.type === 'file' ? (
        <div className={styles.fileMessage}>
          <span className={styles.fileIcon}>
            <FiFileText aria-hidden="true" size={21} />
          </span>
          <span className={styles.fileText}>
            <strong>
              <HighlightedText query={searchQuery} text={message.attachment?.name ?? message.text} />
            </strong>
            <small>
              {[message.attachment?.extension, message.attachment?.sizeLabel].filter(Boolean).join(' / ')}
            </small>
          </span>
        </div>
      ) : (
        <p>
          <HighlightedText query={searchQuery} text={message.text} />
        </p>
      )}
      <span className={styles.meta}>
        <time>{formatShortTime(message.createdAt)}</time>
        {isOutgoing ? (
          <span className={styles.checks} aria-label={deliveryStatusLabels[message.status] ?? message.status}>
            <FiCheck aria-hidden="true" size={13} />
            {message.status !== 'sent' ? <FiCheck aria-hidden="true" size={13} className={styles.secondCheck} /> : null}
          </span>
        ) : null}
      </span>
    </article>
  );
}
