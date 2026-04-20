import styles from './OrderStatusBadge.module.css';

export function OrderStatusBadge({ status }) {
  return <span className={styles.badge}>{status}</span>;
}
