import { useState } from 'react';
import { FiBellOff, FiDownload, FiImage, FiMoreVertical, FiPhone, FiSearch, FiTrash2, FiUser, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { setMessageSearchOpen, setMessageSearchQuery, toggleMessageSearch } from '../../features/app/appSlice';
import { Avatar } from '../Avatar/Avatar';
import { IconButton } from '../IconButton/IconButton';
import { MenuDropdown } from '../MenuDropdown/MenuDropdown';
import styles from './ChatHeader.module.css';

export function ChatHeader({ onProfileClick, title, subtitle, tone = 'rose' }) {
  const dispatch = useDispatch();
  const messageSearchQuery = useSelector((state) => state.app.messageSearchQuery);
  const messageSearchOpen = useSelector((state) => state.app.messageSearchOpen);
  const [menuOpen, setMenuOpen] = useState(false);

  const actionItems = [
    { icon: FiBellOff, label: 'Mute notifications' },
    { icon: FiUser, label: 'View profile', onClick: onProfileClick },
    { icon: FiImage, label: 'Set wallpaper' },
    { icon: FiDownload, label: 'Export chat history' },
    { icon: FiTrash2, label: 'Clear history', danger: true },
    { icon: FiX, label: 'Delete chat', danger: true },
  ];

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
        <div className={styles.menuSlot}>
          <IconButton
            label="Open chat menu"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setMenuOpen((value) => !value)}
          >
          <FiMoreVertical aria-hidden="true" size={20} />
          </IconButton>
          {menuOpen ? <MenuDropdown align="right" items={actionItems} onClose={() => setMenuOpen(false)} /> : null}
        </div>
      </nav>
    </header>
  );
}
