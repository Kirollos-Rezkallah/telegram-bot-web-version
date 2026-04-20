import styles from './AppFrame.module.css';

export function AppFrame({ children, className = '', compact = false }) {
  return (
    <main className={styles.viewport}>
      <section className={`${styles.shell} ${compact ? styles.compact : ''} ${className}`}>{children}</section>
    </main>
  );
}
