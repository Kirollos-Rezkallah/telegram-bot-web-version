import styles from './IconButton.module.css';

export function IconButton({ label, children, className = '', variant = 'ghost', ...props }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      type="button"
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}
