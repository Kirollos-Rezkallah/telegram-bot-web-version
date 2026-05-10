import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { MessageBubble } from '../MessageBubble/MessageBubble';
import styles from './MessageList.module.css';

export function MessageList({ messages }) {
  const scrollerRef = useRef(null);
  const searchQuery = useSelector((state) => state.app.messageSearchQuery.trim().toLowerCase());
  const visibleMessages = searchQuery
    ? messages.filter((message) => message.text.toLowerCase().includes(searchQuery))
    : messages;
  const lastMessageId = visibleMessages.at(-1)?.id;

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior: 'smooth',
    });
  }, [lastMessageId]);

  return (
    <div className={styles.scroller} ref={scrollerRef}>
      <div className={styles.history}>
        <div className={styles.dayDivider}>Сегодня</div>
        {searchQuery ? <div className={styles.searchInfo}>{visibleMessages.length} результатов</div> : null}
        {visibleMessages.length === 0 && searchQuery ? <p className={styles.empty}>Сообщения не найдены</p> : null}
        {visibleMessages.map((message, index) => {
          const previous = visibleMessages[index - 1];
          const next = visibleMessages[index + 1];

          return (
            <MessageBubble
              key={message.id}
              groupedWithNext={next?.author === message.author}
              groupedWithPrevious={previous?.author === message.author}
              message={message}
              searchQuery={searchQuery}
            />
          );
        })}
      </div>
    </div>
  );
}
