import { IconButton } from '../IconButton/IconButton';
import styles from './Composer.module.css';

export function Composer() {
  return (
    <footer className={styles.composer}>
      <IconButton label="Attach file">
        <span className={styles.clipIcon} />
      </IconButton>
      <label className={styles.inputWrap}>
        <span className="visually-hidden">Message</span>
        <input type="text" placeholder="Message" />
      </label>
      <IconButton label="Send order request" variant="filled">
        <span className={styles.sendIcon} />
      </IconButton>
    </footer>
  );
}
