import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';

import { setSidebarQuery } from '../../features/app/appSlice';
import { IconButton } from '../IconButton/IconButton';
import { Avatar } from '../Avatar/Avatar';
import styles from './SidebarHeader.module.css';

export function SidebarHeader() {
  const dispatch = useDispatch();
  const sidebarQuery = useSelector((state) => state.app.sidebarQuery);

  return (
    <header className={styles.panel}>
      <div className={styles.profile}>
        <Avatar label="Anastasia" tone="rose" />
        <div className={styles.profileText}>
          <strong>Anastasia</strong>
          <span>customer workspace</span>
        </div>
        <IconButton label="Main menu" className={styles.menuButton}>
          <FiMenu aria-hidden="true" size={21} />
        </IconButton>
      </div>

      <div className={styles.controls}>
        <label className={styles.search}>
          <FiSearch className={styles.searchIcon} aria-hidden="true" size={17} />
          <span className="visually-hidden">Search</span>
          <input
            type="search"
            placeholder="Search"
            value={sidebarQuery}
            onChange={(event) => dispatch(setSidebarQuery(event.target.value))}
          />
          {sidebarQuery ? (
            <button className={styles.clearSearch} type="button" onClick={() => dispatch(setSidebarQuery(''))} aria-label="Clear search">
              <FiX aria-hidden="true" size={15} />
            </button>
          ) : null}
        </label>
      </div>
    </header>
  );
}
