import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FiArchive, FiMoon, FiPhoneCall, FiSettings, FiStar, FiUser, FiUsers, FiMenu, FiSearch, FiX } from 'react-icons/fi';

import { setSidebarQuery } from '../../features/app/appSlice';
import { IconButton } from '../IconButton/IconButton';
import { Avatar } from '../Avatar/Avatar';
import { MenuDropdown } from '../MenuDropdown/MenuDropdown';
import styles from './SidebarHeader.module.css';

const menuItems = [
  { icon: FiUser, label: 'Мой профиль' },
  { icon: FiUsers, label: 'Контакты' },
  { icon: FiPhoneCall, label: 'Звонки' },
  { icon: FiStar, label: 'Избранное' },
  { icon: FiSettings, label: 'Настройки' },
  { icon: FiMoon, label: 'Ночной режим', trailing: 'Выкл.' },
  { icon: FiArchive, label: 'Архив чатов' },
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
          <span>рабочее пространство клиента</span>
        </div>
        <IconButton
          label="Главное меню"
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
                  <span>рабочее пространство клиента</span>
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
          <span className="visually-hidden">Поиск</span>
          <input
            type="search"
            placeholder="Поиск"
            value={sidebarQuery}
            onChange={(event) => dispatch(setSidebarQuery(event.target.value))}
          />
          {sidebarQuery ? (
            <button className={styles.clearSearch} type="button" onClick={() => dispatch(setSidebarQuery(''))} aria-label="Очистить поиск">
              <FiX aria-hidden="true" size={15} />
            </button>
          ) : null}
        </label>
      </div>
    </header>
  );
}
