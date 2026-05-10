import { useDispatch, useSelector } from 'react-redux';
import { FiBellOff, FiCheckCircle, FiMapPin } from 'react-icons/fi';

import { setActiveChat } from '../../features/app/appSlice';
import { markChatRead } from '../../features/chats/chatsSlice';
import { selectActiveChatId, selectChatList } from '../../features/chats/chatsSelectors';
import { Avatar } from '../Avatar/Avatar';
import styles from './ChatList.module.css';

const fallbackTones = ['blue', 'rose', 'green', 'violet', 'amber'];

export function ChatList() {
  const dispatch = useDispatch();
  const activeChatId = useSelector(selectActiveChatId);
  const chats = useSelector(selectChatList);

  return (
    <div className={styles.list}>
      {chats.length === 0 ? <p className={styles.empty}>Чаты не найдены</p> : null}
      {chats.map((chat, index) => {
        const isActive = chat.id === activeChatId;
        const tone = chat.tone ?? fallbackTones[index % fallbackTones.length];

        const handleSelectChat = () => {
          dispatch(setActiveChat(chat.id));
          dispatch(markChatRead(chat.id));
        };

        return (
          <button
            key={chat.id}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            type="button"
            onClick={handleSelectChat}
          >
            <span className={styles.avatarWrap}>
              <Avatar label={chat.title} tone={tone} />
              {chat.kind === 'bot' ? <span className={styles.botDot} aria-hidden="true" /> : null}
            </span>
            <span className={styles.content}>
              <span className={styles.row}>
                <strong>
                  {chat.title}
                  {chat.isVerified ? <FiCheckCircle className={styles.verified} aria-label="подтверждено" size={15} /> : null}
                </strong>
                <time>{chat.timestamp}</time>
              </span>
              <span className={styles.row}>
                <span className={styles.preview}>{chat.subtitle}</span>
                <span className={styles.meta}>
                  {chat.isMuted ? <FiBellOff className={styles.metaIcon} aria-label="уведомления отключены" size={14} /> : null}
                  {chat.isPinned ? <FiMapPin className={styles.metaIcon} aria-label="закреплено" size={14} /> : null}
                  {chat.unreadCount ? <span className={styles.badge}>{chat.unreadCount}</span> : null}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
