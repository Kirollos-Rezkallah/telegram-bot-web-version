import { useEffect, useRef } from 'react';

import styles from './MenuDropdown.module.css';

export function MenuDropdown({ align = 'left', header, items = [], onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current?.contains(event.target)) {
        return;
      }

      onClose?.();
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={`${styles.menu} ${styles[align]}`} ref={menuRef} role="menu">
      {header ? <div className={styles.header}>{header}</div> : null}
      <div className={styles.items}>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className={`${styles.item} ${item.danger ? styles.danger : ''}`}
              disabled={item.disabled}
              key={item.label}
              type="button"
              onClick={() => {
                item.onClick?.();
                onClose?.();
              }}
              role="menuitem"
            >
              {Icon ? <Icon aria-hidden="true" size={19} /> : null}
              <span>{item.label}</span>
              {item.trailing ? <strong>{item.trailing}</strong> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
