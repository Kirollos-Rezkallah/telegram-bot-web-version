import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FiArchive, FiMoon, FiPhoneCall, FiSettings, FiStar, FiUser, FiUsers, FiMenu, FiSearch, FiX } from 'react-icons/fi';

import { setSidebarQuery } from '../../features/app/appSlice';
import { IconButton } from '../IconButton/IconButton';
import { Avatar } from '../Avatar/Avatar';
import { MenuDropdown } from '../MenuDropdown/MenuDropdown';
import styles from './SidebarHeader.module.css';

const menuItems = [
  { icon: FiUser, label: 'My Profile' },
  { icon: FiUsers, label: 'Contacts' },
  { icon: FiPhoneCall, label: 'Calls' },
  { icon: FiStar, label: 'Saved Messages' },
  { icon: FiSettings, label: 'Settings' },
  { icon: FiMoon, label: 'Night Mode', trailing: 'Off' },
  { icon: FiArchive, label: 'Archived Chats' },
];

export function SidebarHeader() {
  const dispatch = useDispatch();
  const sidebarQuery = useSelector((state) => state.app.sidebarQuery);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.panel}>
      <div className={styles.profile}>
        <Avatar label="Anastasia" tone="rose" />
        <div className={styles.profileText}>
          <strong>Anastasia</strong>
          <span>customer workspace</span>
        </div>
        <IconButton
          label="Main menu"
          className={styles.menuButton}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <FiMenu aria-hidden="true" size={21} />
        </IconButton>
        {menuOpen ? (
          <MenuDropdown
            header={
              <>
                <Avatar label="Anastasia" tone="rose" />
                <span>
                  <strong>Anastasia</strong>
                  <span>customer workspace</span>
                </span>
              </>
            }
            items={menuItems}
            onClose={() => setMenuOpen(false)}
          />
        ) : null}
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
