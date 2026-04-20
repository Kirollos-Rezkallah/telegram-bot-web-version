import styles from './AdminSummaryCard.module.css';

export function AdminSummaryCard({ label, value, accent = 'blue' }) {
  return (
    <article className={`${styles.card} ${styles[accent]}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
