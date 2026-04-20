import { IconButton } from '../IconButton/IconButton';
import { Avatar } from '../Avatar/Avatar';
import styles from './SidebarHeader.module.css';

export function SidebarHeader() {
  return (
    <header className={styles.panel}>
      <div className={styles.profile}>
        <Avatar label="Anastasia" tone="rose" />
        <div className={styles.profileText}>
          <strong>Anastasia</strong>
          <span>customer workspace</span>
        </div>
        <IconButton label="Main menu" className={styles.menuButton}>
          <span className={styles.menuIcon} />
        </IconButton>
      </div>

      <div className={styles.controls}>
        <label className={styles.search}>
          <span className={styles.searchIcon} />
          <span className="visually-hidden">Search</span>
          <input type="search" placeholder="Search" />
        </label>
      </div>
    </header>
  );
}
