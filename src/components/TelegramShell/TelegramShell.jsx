import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDetailPanelWidth, setSidebarWidth } from '../../features/app/appSlice';
import styles from './TelegramShell.module.css';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function TelegramShell({ sidebar, children, details }) {
  const dispatch = useDispatch();
  const shellRef = useRef(null);
  const dragModeRef = useRef(null);
  const { detailPanelWidth, sidebarWidth } = useSelector((state) => state.app.layout);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!dragModeRef.current || !shellRef.current) {
        return;
      }

      const rect = shellRef.current.getBoundingClientRect();

      if (dragModeRef.current === 'sidebar') {
        dispatch(setSidebarWidth(clamp(event.clientX - rect.left, 300, 480)));
      }

      if (dragModeRef.current === 'details') {
        dispatch(setDetailPanelWidth(clamp(rect.right - event.clientX, 280, 430)));
      }
    };

    const stopDrag = () => {
      dragModeRef.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDrag);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDrag);
    };
  }, [dispatch]);

  const startDrag = (mode) => (event) => {
    event.preventDefault();
    dragModeRef.current = mode;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div className={styles.shell} ref={shellRef}>
      <aside className={styles.sidebar} style={{ width: sidebarWidth }}>{sidebar}</aside>
      <button
        className={`${styles.resizeHandle} ${styles.sidebarHandle}`}
        type="button"
        aria-label="Resize sidebar"
        onPointerDown={startDrag('sidebar')}
      />
      <section className={styles.chat}>{children}</section>
      {details ? (
        <>
          <button
            className={`${styles.resizeHandle} ${styles.detailsHandle}`}
            type="button"
            aria-label="Resize info panel"
            onPointerDown={startDrag('details')}
          />
          <aside className={styles.details} style={{ width: detailPanelWidth }}>{details}</aside>
        </>
      ) : null}
    </div>
  );
}
