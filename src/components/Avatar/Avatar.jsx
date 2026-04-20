import styles from './Avatar.module.css';

export function Avatar({ label, image, tone = 'blue' }) {
  return (
    <div className={`${styles.avatar} ${styles[tone]}`} aria-label={label}>
      {image ? <img src={image} alt="" /> : <span>{label.slice(0, 1)}</span>}
    </div>
  );
}
