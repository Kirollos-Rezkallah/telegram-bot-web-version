import styles from './Avatar.module.css';

export function Avatar({ className = '', label, image, tone = 'blue' }) {
  return (
    <div className={`${styles.avatar} ${styles[tone]} ${className}`} aria-label={label}>
      {image ? <img src={image} alt="" /> : <span>{label.slice(0, 1)}</span>}
    </div>
  );
}
