import { Link } from 'react-router-dom';

import styles from './RoleEntryCard.module.css';

export function RoleEntryCard({ eyebrow, title, description, to, actionLabel, children }) {
  return (
    <article className={styles.card}>
      <div className={styles.icon}>{children}</div>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className={styles.action} to={to}>
        {actionLabel}
      </Link>
    </article>
  );
}
