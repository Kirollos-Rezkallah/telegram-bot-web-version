import { FiMoreVertical, FiPhone, FiSearch, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { setMessageSearchOpen, setMessageSearchQuery, toggleMessageSearch } from '../../features/app/appSlice';
import { Avatar } from '../Avatar/Avatar';
import { IconButton } from '../IconButton/IconButton';
import styles from './ChatHeader.module.css';

export function ChatHeader({ onProfileClick, title, subtitle, tone = 'rose' }) {
  const dispatch = useDispatch();
  const messageSearchQuery = useSelector((state) => state.app.messageSearchQuery);
  const messageSearchOpen = useSelector((state) => state.app.messageSearchOpen);

  return (
    <header className={styles.header}>
      <button className={styles.profileButton} type="button" onClick={onProfileClick}>
        <Avatar label={title} tone={tone} />
        <div className={styles.identity}>
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </div>
      </button>
      {messageSearchOpen ? (
        <label className={styles.searchBox}>
          <FiSearch aria-hidden="true" size={16} />
          <span className="visually-hidden">Search messages</span>
          <input
            autoFocus
            type="search"
            placeholder="Search in chat"
            value={messageSearchQuery}
            onChange={(event) => dispatch(setMessageSearchQuery(event.target.value))}
          />
          <button type="button" onClick={() => dispatch(setMessageSearchOpen(false))} aria-label="Close message search">
            <FiX aria-hidden="true" size={15} />
          </button>
        </label>
      ) : null}
      <nav className={styles.actions} aria-label="Chat actions">
        <IconButton label="Call">
          <FiPhone aria-hidden="true" size={20} />
        </IconButton>
        <IconButton label="Search messages" onClick={() => dispatch(toggleMessageSearch())}>
          <FiSearch aria-hidden="true" size={20} />
        </IconButton>
        <IconButton label="Open details">
          <FiMoreVertical aria-hidden="true" size={20} />
        </IconButton>
      </nav>
    </header>
  );
}
