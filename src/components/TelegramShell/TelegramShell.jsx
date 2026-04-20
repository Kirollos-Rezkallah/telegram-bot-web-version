import styles from './TelegramShell.module.css';

export function TelegramShell({ sidebar, children, details }) {
  return (
    <>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <section className={styles.chat}>{children}</section>
      {details ? <aside className={styles.details}>{details}</aside> : null}
    </>
  );
}
