import { useDispatch, useSelector } from 'react-redux';

import { setActiveDialog } from '../../features/chat/chatSlice';
import { Avatar } from '../Avatar/Avatar';
import styles from './ChatList.module.css';

const fallbackTones = ['blue', 'rose', 'green', 'violet', 'amber'];

export function ChatList() {
  const dispatch = useDispatch();
  const { activeDialogId, dialogs } = useSelector((state) => state.chat);

  return (
    <div className={styles.list}>
      {dialogs.map((dialog, index) => {
        const isActive = dialog.id === activeDialogId;
        const tone = dialog.tone ?? fallbackTones[index % fallbackTones.length];

        return (
          <button
            key={dialog.id}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            type="button"
            onClick={() => dispatch(setActiveDialog(dialog.id))}
          >
            <span className={styles.avatarWrap}>
              <Avatar label={dialog.title} tone={tone} />
              {dialog.status === 'bot' ? <span className={styles.botDot} aria-hidden="true" /> : null}
            </span>
            <span className={styles.content}>
              <span className={styles.row}>
                <strong>
                  {dialog.title}
                  {dialog.isVerified ? <span className={styles.verified} aria-label="verified" /> : null}
                </strong>
                <time>{dialog.timestamp}</time>
              </span>
              <span className={styles.row}>
                <span className={styles.preview}>{dialog.subtitle}</span>
                <span className={styles.meta}>
                  {dialog.isMuted ? <span className={styles.muted} aria-label="muted" /> : null}
                  {dialog.isPinned ? <span className={styles.pin} aria-label="pinned" /> : null}
                  {dialog.unreadCount ? <span className={styles.badge}>{dialog.unreadCount}</span> : null}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
