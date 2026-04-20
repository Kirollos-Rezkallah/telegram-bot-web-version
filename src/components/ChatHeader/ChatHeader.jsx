import { Avatar } from '../Avatar/Avatar';
import { IconButton } from '../IconButton/IconButton';
import styles from './ChatHeader.module.css';

export function ChatHeader({ title, subtitle }) {
  return (
    <header className={styles.header}>
      <Avatar label={title} tone="rose" />
      <div className={styles.identity}>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      <nav className={styles.actions} aria-label="Chat actions">
        <IconButton label="Search messages">
          <span className={styles.searchIcon} />
        </IconButton>
        <IconButton label="Open details">
          <span className={styles.moreIcon} />
        </IconButton>
      </nav>
    </header>
  );
}
